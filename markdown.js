/**
 * MarkdownParser - Complete custom Markdown-to-HTML parser for xzc.ai
 * Supports: bold, italic, strikethrough, inline code, headings, lists,
 * code blocks with syntax highlighting header, blockquotes, horizontal rules,
 * links, images, GFM tables, LaTeX/math, and XSS prevention.
 *
 * Usage: window.MarkdownParser.parse(markdownString) => htmlString
 */
window.MarkdownParser = (function () {
    'use strict';

    // ─── Placeholder Management ──────────────────────────────────────
    // We replace protected content (code blocks, inline code, math) with
    // unique placeholders so inner markdown parsing is skipped entirely.

    let placeholderIndex = 0;
    let placeholders = {};

    function resetPlaceholders() {
        placeholderIndex = 0;
        placeholders = {};
    }

    function storePlaceholder(html) {
        const key = '\x00PH' + (placeholderIndex++) + 'PH\x00';
        placeholders[key] = html;
        return key;
    }

    function restorePlaceholders(text) {
        // Restore iteratively – placeholders may be nested inside restored content
        let previous;
        do {
            previous = text;
            for (const key in placeholders) {
                if (text.indexOf(key) !== -1) {
                    text = text.split(key).join(placeholders[key]);
                }
            }
        } while (text !== previous);
        return text;
    }

    // ─── HTML Entity Escaping (XSS Prevention) ──────────────────────

    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // ─── Step 1: Extract & Protect Code Blocks ──────────────────────

    function extractCodeBlocks(text) {
        // Fenced code blocks: ```lang\n...\n```
        return text.replace(/```(\w*)\n([\s\S]*?)```/g, function (match, lang, code) {
            const escapedCode = escapeHtml(code.replace(/\n$/, ''));
            const langLabel = lang ? lang : 'text';
            const html =
                '<pre><div class="code-header">' +
                '<span class="code-lang">' + escapeHtml(langLabel) + '</span>' +
                '<button class="copy-code-btn" onclick="Utils.copyToClipboard(this.closest(\'pre\').querySelector(\'code\').textContent).then(()=>{this.textContent=\'Copied!\';setTimeout(()=>{this.textContent=\'Copy\'},2000)})">Copy</button>' +
                '</div><code>' + escapedCode + '</code></pre>';
            return storePlaceholder(html);
        });
    }

    // ─── Step 2: Extract & Protect Inline Code ──────────────────────

    function extractInlineCode(text) {
        // Inline code: `code`  (single backtick, non-greedy)
        return text.replace(/`([^`\n]+?)`/g, function (match, code) {
            const html = '<code>' + escapeHtml(code) + '</code>';
            return storePlaceholder(html);
        });
    }

    // ─── Step 3: Extract & Protect Math ─────────────────────────────

    function extractMathBlocks(text) {
        // Block math: $$...$$ (can span multiple lines)
        text = text.replace(/\$\$([\s\S]*?)\$\$/g, function (match, math) {
            const html = '<div class="math-block">' + escapeHtml(math.trim()) + '</div>';
            return storePlaceholder(html);
        });
        return text;
    }

    function extractInlineMath(text) {
        // Inline math: $...$ (single line, not preceded/followed by space-dollar ambiguity)
        // Avoid matching things like price "$5" by requiring non-space after opening $
        // and non-space before closing $
        return text.replace(/\$([^\s$][^$]*?[^\s$])\$/g, function (match, math) {
            const html = '<span class="math-inline">' + escapeHtml(math) + '</span>';
            return storePlaceholder(html);
        });
    }

    // ─── Block-Level Parsing ────────────────────────────────────────

    function parseHeading(line) {
        const m = line.match(/^(#{1,6})\s+(.+)$/);
        if (m) {
            const level = m[1].length;
            const content = parseInline(m[2]);
            return '<h' + level + '>' + content + '</h' + level + '>';
        }
        return null;
    }

    function parseHorizontalRule(line) {
        if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(line.trim())) {
            return '<hr>';
        }
        return null;
    }

    function parseBlockquote(lines, startIndex) {
        const collected = [];
        let i = startIndex;
        while (i < lines.length && /^>\s?/.test(lines[i])) {
            collected.push(lines[i].replace(/^>\s?/, ''));
            i++;
        }
        if (collected.length === 0) return null;
        // Recursively parse the content inside the blockquote
        const innerHtml = parseBlocks(collected);
        return {
            html: '<blockquote>' + innerHtml + '</blockquote>',
            consumed: collected.length
        };
    }

    // ─── Table Parsing (GFM) ────────────────────────────────────────

    function parseTable(lines, startIndex) {
        // A table requires at least a header row and a separator row
        if (startIndex + 1 >= lines.length) return null;

        const headerLine = lines[startIndex].trim();
        const separatorLine = lines[startIndex + 1] ? lines[startIndex + 1].trim() : '';

        // Check if both lines look like table rows
        if (!headerLine.includes('|') || !separatorLine.includes('|')) return null;

        // Validate separator: must contain only |, -, :, and spaces
        if (!/^[\s|:\-]+$/.test(separatorLine)) return null;

        function splitRow(line) {
            let row = line.trim();
            if (row.startsWith('|')) row = row.substring(1);
            if (row.endsWith('|')) row = row.substring(0, row.length - 1);
            return row.split('|').map(function (cell) { return cell.trim(); });
        }

        const headers = splitRow(headerLine);
        const separators = splitRow(separatorLine);

        // Must have same number of columns
        if (headers.length !== separators.length) return null;

        // Determine alignment from separator
        const alignments = separators.map(function (sep) {
            const left = sep.startsWith(':');
            const right = sep.endsWith(':');
            if (left && right) return 'center';
            if (right) return 'right';
            if (left) return 'left';
            return 'left';
        });

        // Build header HTML
        let html = '<table><thead><tr>';
        headers.forEach(function (header, idx) {
            const align = alignments[idx] || 'left';
            html += '<th style="text-align:' + align + '">' + parseInline(header) + '</th>';
        });
        html += '</tr></thead><tbody>';

        // Consume body rows
        let i = startIndex + 2;
        while (i < lines.length) {
            const row = lines[i].trim();
            if (!row.includes('|') || row === '') break;
            const cells = splitRow(row);
            html += '<tr>';
            for (let c = 0; c < headers.length; c++) {
                const align = alignments[c] || 'left';
                const cellContent = cells[c] !== undefined ? parseInline(cells[c]) : '';
                html += '<td style="text-align:' + align + '">' + cellContent + '</td>';
            }
            html += '</tr>';
            i++;
        }

        html += '</tbody></table>';

        return {
            html: html,
            consumed: i - startIndex
        };
    }

    // ─── List Parsing (Ordered & Unordered, Nested) ─────────────────

    function isBullet(line) {
        return /^(\s*)([-*+])\s+(.*)$/.test(line);
    }

    function isOrdered(line) {
        return /^(\s*)(\d+)\.\s+(.*)$/.test(line);
    }

    function isListItem(line) {
        return isBullet(line) || isOrdered(line);
    }

    function getIndentLevel(line) {
        var m = line.match(/^(\s*)/);
        return m ? m[1].length : 0;
    }

    function parseList(lines, startIndex) {
        if (startIndex >= lines.length) return null;
        if (!isListItem(lines[startIndex])) return null;

        // Determine list type from first item
        const firstIsOrdered = isOrdered(lines[startIndex]);
        const baseIndent = getIndentLevel(lines[startIndex]);

        const tag = firstIsOrdered ? 'ol' : 'ul';
        let html = '<' + tag + '>';
        let i = startIndex;

        while (i < lines.length) {
            const line = lines[i];
            if (!isListItem(line)) break;

            const currentIndent = getIndentLevel(line);
            if (currentIndent < baseIndent) break;

            if (currentIndent > baseIndent) {
                // Nested list – collect all deeper-indented items
                const nestedStart = i;
                while (i < lines.length && isListItem(lines[i]) && getIndentLevel(lines[i]) > baseIndent) {
                    i++;
                }
                const nestedLines = lines.slice(nestedStart, i);
                const nestedResult = parseList(nestedLines, 0);
                if (nestedResult) {
                    // Append nested list inside the last <li>
                    html = html.replace(/<\/li>$/, '') + nestedResult.html + '</li>';
                }
                continue;
            }

            // Same indent level – normal item
            let m;
            if (firstIsOrdered) {
                m = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
            } else {
                m = line.match(/^(\s*)([-*+])\s+(.*)$/);
            }
            if (m) {
                html += '<li>' + parseInline(m[3]) + '</li>';
            }
            i++;
        }

        html += '</' + tag + '>';
        return {
            html: html,
            consumed: i - startIndex
        };
    }

    // ─── Inline Parsing ─────────────────────────────────────────────

    function parseInline(text) {
        // Bold + Italic: ***text*** or ___text___
        text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
        text = text.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');

        // Bold: **text** or __text__
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');

        // Italic: *text* or _text_
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        text = text.replace(/(?<![a-zA-Z0-9])_(.+?)_(?![a-zA-Z0-9])/g, '<em>$1</em>');

        // Strikethrough: ~~text~~
        text = text.replace(/~~(.+?)~~/g, '<del>$1</del>');

        // Images: ![alt](url)  – must come before links
        text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,
            '<img src="$2" alt="$1" loading="lazy">');

        // Links: [text](url)
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener">$1</a>');

        return text;
    }

    // ─── Block-Level Assembly ───────────────────────────────────────

    function parseBlocks(lines) {
        let html = '';
        let i = 0;
        let paragraphBuffer = [];

        function flushParagraph() {
            if (paragraphBuffer.length > 0) {
                const content = paragraphBuffer.map(function (l) {
                    return parseInline(l);
                }).join('<br>');
                html += '<p>' + content + '</p>';
                paragraphBuffer = [];
            }
        }

        while (i < lines.length) {
            const line = lines[i];
            const trimmed = line.trim();

            // ── Empty line: flush paragraph ──
            if (trimmed === '') {
                flushParagraph();
                i++;
                continue;
            }

            // ── Placeholder lines (code blocks, math blocks already extracted) ──
            if (trimmed.indexOf('\x00PH') !== -1 && trimmed.match(/^\x00PH\d+PH\x00$/)) {
                flushParagraph();
                html += trimmed;
                i++;
                continue;
            }

            // ── Horizontal rule ──
            const hr = parseHorizontalRule(trimmed);
            if (hr) {
                flushParagraph();
                html += hr;
                i++;
                continue;
            }

            // ── Heading ──
            const heading = parseHeading(trimmed);
            if (heading) {
                flushParagraph();
                html += heading;
                i++;
                continue;
            }

            // ── Blockquote ──
            if (/^>\s?/.test(trimmed)) {
                flushParagraph();
                const bq = parseBlockquote(lines, i);
                if (bq) {
                    html += bq.html;
                    i += bq.consumed;
                    continue;
                }
            }

            // ── Table ──
            if (trimmed.includes('|')) {
                const table = parseTable(lines, i);
                if (table) {
                    flushParagraph();
                    html += table.html;
                    i += table.consumed;
                    continue;
                }
            }

            // ── List ──
            if (isListItem(trimmed)) {
                flushParagraph();
                const list = parseList(lines, i);
                if (list) {
                    html += list.html;
                    i += list.consumed;
                    continue;
                }
            }

            // ── Normal text: accumulate into paragraph ──
            paragraphBuffer.push(trimmed);
            i++;
        }

        flushParagraph();
        return html;
    }

    // ─── Main Parse Function ────────────────────────────────────────

    function parse(text) {
        if (!text || typeof text !== 'string') return '';

        resetPlaceholders();

        // Step 1: Escape HTML in raw input (XSS prevention)
        text = escapeHtml(text);

        // Step 2: Extract & protect fenced code blocks
        text = extractCodeBlocks(text);

        // Step 3: Extract & protect inline code
        text = extractInlineCode(text);

        // Step 4: Extract & protect math (block then inline)
        text = extractMathBlocks(text);
        text = extractInlineMath(text);

        // Step 5–7: Split into lines and process block-level & inline elements
        const lines = text.split('\n');
        let html = parseBlocks(lines);

        // Step 8: Restore all placeholders
        html = restorePlaceholders(html);

        return html;
    }

    // ─── Public API ─────────────────────────────────────────────────
    return {
        parse: parse
    };

})();
