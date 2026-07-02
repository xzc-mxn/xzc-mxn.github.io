/**
 * Chat controller for xzc.ai.
 * Handles message rendering, history actions, input behavior, and AI streaming.
 */
window.ChatController = (() => {
    'use strict';

    const ACTIVE_CHAT_KEY = 'xzc_ai_active_chat';

    let currentChatId = null;
    let abortController = null;
    let isStreaming = false;
    let lastSearchQuery = '';
    let saveStreamingContent = null;

    // Pending file attachments
    let pendingFiles = []; // Array of { name, type, dataUrl, text }

    const SUPPORTED_TEXT_EXTS = new Set([
        'txt', 'md', 'csv', 'json', 'js', 'ts', 'jsx', 'tsx',
        'py', 'html', 'css', 'xml', 'yaml', 'yml', 'sh', 'c',
        'cpp', 'h', 'java', 'go', 'rb', 'rs', 'php', 'sql'
    ]);

    const els = {};

    const icons = {
        chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>',
        edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
        trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
        copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
        refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 1-15.5 6.2"/><path d="M3 12A9 9 0 0 1 18.5 5.8"/><path d="M18 2v4h4"/><path d="M6 22v-4H2"/></svg>'
    };

    function queryElements() {
        els.welcome = document.getElementById('welcome-screen');
        els.chatContainer = document.getElementById('chat-container');
        els.messages = document.getElementById('messages-container');
        els.typing = document.getElementById('typing-indicator');
        els.input = document.getElementById('message-input');
        els.sendBtn = document.getElementById('send-btn');
        els.tokenEstimate = document.getElementById('token-estimate');
        els.historyList = document.getElementById('chat-history-list');
        els.search = document.getElementById('search-input');
        els.suggestionButtons = Array.from(document.querySelectorAll('.suggestion-card'));
        // File upload elements
        els.uploadBtn = document.getElementById('upload-btn');
        els.fileInput = document.getElementById('file-upload-input');
        els.filePreviewList = document.getElementById('file-preview-list');
        els.inputWrapper = document.getElementById('input-wrapper');
        // Voice input elements
        els.voiceBtn = document.getElementById('voice-btn');
        els.voiceRecordingRing = document.getElementById('voice-recording-ring');
    }

    function init() {
        queryElements();
        saveStreamingContent = (chatId, content) => {
            ChatHistory.updateLastMessage(chatId, content);
        };

        bindEvents();

        const savedChatId = localStorage.getItem(ACTIVE_CHAT_KEY);
        const savedChat = savedChatId ? ChatHistory.getById(savedChatId) : null;
        const fallbackChat = ChatHistory.getAll()[0] || null;

        if (savedChat) {
            loadChat(savedChat.id);
        } else if (fallbackChat) {
            loadChat(fallbackChat.id);
        } else {
            newChat(false);
        }

        renderHistory();
        updateInputState();
    }

    function bindEvents() {
        if (els.input) {
            els.input.addEventListener('input', () => {
                Utils.autoResize(els.input);
                updateInputState();
            });

            els.input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
                    event.preventDefault();
                    sendCurrentMessage();
                }
            });
        }

        if (els.sendBtn) {
            els.sendBtn.addEventListener('click', () => {
                if (isStreaming) {
                    stopStreaming();
                    return;
                }
                sendCurrentMessage();
            });
        }

        if (els.search) {
            els.search.addEventListener('input', Utils.debounce(() => {
                lastSearchQuery = els.search.value;
                renderHistory(lastSearchQuery);
            }, 120));
        }

        els.suggestionButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const suggestion = button.getAttribute('data-suggestion') || '';
                if (!suggestion || !els.input) {
                    return;
                }
                els.input.value = suggestion;
                Utils.autoResize(els.input);
                updateInputState();
                sendCurrentMessage();
            });
        });

        // --- File upload ---
        if (els.uploadBtn && els.fileInput) {
            els.uploadBtn.addEventListener('click', () => els.fileInput.click());

            els.fileInput.addEventListener('change', () => {
                if (els.fileInput.files && els.fileInput.files.length > 0) {
                    processFiles(Array.from(els.fileInput.files));
                }
                els.fileInput.value = '';
            });
        }

        // Drag-and-drop onto the input wrapper
        if (els.inputWrapper) {
            els.inputWrapper.addEventListener('dragover', (e) => {
                e.preventDefault();
                els.inputWrapper.classList.add('drag-over');
            });

            els.inputWrapper.addEventListener('dragleave', () => {
                els.inputWrapper.classList.remove('drag-over');
            });

            els.inputWrapper.addEventListener('drop', (e) => {
                e.preventDefault();
                els.inputWrapper.classList.remove('drag-over');
                const files = Array.from(e.dataTransfer.files);
                if (files.length > 0) {
                    processFiles(files);
                }
            });
        }

        // Paste image from clipboard
        if (els.input) {
            els.input.addEventListener('paste', (e) => {
                const items = Array.from(e.clipboardData?.items || []);
                const imageItems = items.filter((item) => item.type.startsWith('image/'));
                if (imageItems.length > 0) {
                    e.preventDefault();
                    const files = imageItems.map((item) => item.getAsFile()).filter(Boolean);
                    processFiles(files);
                }
            });
        }

        // --- Voice input ---
        if (els.voiceBtn) {
            els.voiceBtn.addEventListener('click', () => {
                if (_voiceIsListening) {
                    stopVoiceInput();
                } else {
                    startVoiceInput();
                }
            });
        }
    }

    /* ============================================================
       File upload helpers
       ============================================================ */

    function getFileExt(filename) {
        return filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();
    }

    function getFileEmoji(file) {
        if (file.type.startsWith('image/')) return '🖼️';
        const ext = getFileExt(file.name);
        if (ext === 'pdf') return '📄';
        if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'go', 'rb', 'php', 'c', 'cpp', 'h', 'rs', 'sh'].includes(ext)) return '💻';
        if (['html', 'css', 'xml'].includes(ext)) return '🌐';
        if (['json', 'yaml', 'yml'].includes(ext)) return '⚙️';
        if (ext === 'csv') return '📊';
        return '📝';
    }

    async function processFiles(files) {
        const MAX_FILES = 5;
        const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
        const MAX_TEXT_BYTES = 200 * 1024;        // 200 KB

        const remaining = MAX_FILES - pendingFiles.length;
        if (remaining <= 0) {
            Utils.showToast('Maximum 5 files per message.', 'warning');
            return;
        }

        const toProcess = files.slice(0, remaining);
        if (files.length > remaining) {
            Utils.showToast(`Only ${remaining} more file(s) can be added.`, 'info');
        }

        for (const file of toProcess) {
            const ext = getFileExt(file.name);
            const isImage = file.type.startsWith('image/');
            const isText = SUPPORTED_TEXT_EXTS.has(ext);

            if (!isImage && ext !== 'pdf' && !isText) {
                Utils.showToast(`"${file.name}" is not a supported file type.`, 'warning');
                continue;
            }

            if (isImage && file.size > MAX_IMAGE_BYTES) {
                Utils.showToast(`"${file.name}" exceeds the 5 MB image limit.`, 'warning');
                continue;
            }

            if ((isText || ext === 'pdf') && file.size > MAX_TEXT_BYTES) {
                Utils.showToast(`"${file.name}" exceeds the 200 KB limit for text files.`, 'warning');
                continue;
            }

            try {
                if (isImage) {
                    const dataUrl = await readAsDataUrl(file);
                    pendingFiles.push({ name: file.name, type: file.type, dataUrl, text: null });
                } else {
                    const text = await readAsText(file);
                    pendingFiles.push({ name: file.name, type: file.type, dataUrl: null, text });
                }
            } catch {
                Utils.showToast(`Failed to read "${file.name}".`, 'error');
            }
        }

        renderFilePreviews();
        updateInputState();
    }

    function readAsDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('FileReader error'));
            reader.readAsDataURL(file);
        });
    }

    function readAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('FileReader error'));
            reader.readAsText(file);
        });
    }

    function renderFilePreviews() {
        if (!els.filePreviewList) return;

        if (pendingFiles.length === 0) {
            els.filePreviewList.innerHTML = '';
            els.filePreviewList.classList.add('hidden');
            return;
        }

        els.filePreviewList.classList.remove('hidden');
        els.filePreviewList.innerHTML = '';

        pendingFiles.forEach((file, index) => {
            const item = document.createElement('div');
            item.className = 'file-preview-item';

            if (file.dataUrl) {
                const img = document.createElement('img');
                img.src = file.dataUrl;
                img.alt = file.name;
                item.appendChild(img);
            } else {
                const icon = document.createElement('div');
                icon.className = 'file-preview-icon';
                icon.textContent = getFileEmojiFromPending(file);
                item.appendChild(icon);
            }

            const name = document.createElement('span');
            name.className = 'file-preview-name';
            name.textContent = file.name;
            name.title = file.name;
            item.appendChild(name);

            const removeBtn = document.createElement('button');
            removeBtn.className = 'file-preview-remove';
            removeBtn.type = 'button';
            removeBtn.title = 'Remove file';
            removeBtn.textContent = '×';
            removeBtn.addEventListener('click', () => {
                pendingFiles.splice(index, 1);
                renderFilePreviews();
                updateInputState();
            });
            item.appendChild(removeBtn);

            els.filePreviewList.appendChild(item);
        });
    }

    function getFileEmojiFromPending(file) {
        if (file.type && file.type.startsWith('image/')) return '🖼️';
        const ext = getFileExt(file.name);
        if (ext === 'pdf') return '📄';
        if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'go', 'rb', 'php', 'c', 'cpp', 'h', 'rs', 'sh'].includes(ext)) return '💻';
        if (['html', 'css', 'xml'].includes(ext)) return '🌐';
        if (['json', 'yaml', 'yml'].includes(ext)) return '⚙️';
        if (ext === 'csv') return '📊';
        return '📝';
    }

    /** Build the text portion to prepend to the user message for file context */
    function buildFileContext() {
        if (pendingFiles.length === 0) return '';

        const parts = pendingFiles
            .filter((f) => f.text !== null)
            .map((f) => {
                const label = `--- File: ${f.name} ---\n`;
                const body = f.text.length > 8000 ? f.text.slice(0, 8000) + '\n[...truncated]' : f.text;
                return label + body;
            });

        return parts.length > 0 ? parts.join('\n\n') + '\n\n' : '';
    }

    function clearPendingFiles() {
        pendingFiles = [];
        renderFilePreviews();
    }

    /* ============================================================
       Voice Input (Web Speech API)
       ============================================================ */

    let _voiceRecognition = null;
    let _voiceIsListening = false;

    function getSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            return null;
        }
        return new SpeechRecognition();
    }

    function startVoiceInput() {
        const recognition = getSpeechRecognition();
        if (!recognition) {
            Utils.showToast('เบราว์เซอร์ของคุณไม่รองรับ Voice Input กรุณาใช้ Chrome หรือ Edge', 'warning');
            return;
        }

        _voiceRecognition = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'th-TH'; // Default Thai, auto-switches
        recognition.maxAlternatives = 1;

        let finalTranscript = '';

        recognition.onstart = () => {
            _voiceIsListening = true;
            setVoiceListeningState(true);
            Utils.showToast('🎤 กำลังฟัง... พูดได้เลย', 'info');
        };

        recognition.onresult = (event) => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interim += transcript;
                }
            }

            if (els.input) {
                const existingText = els.input.value;
                const baseText = existingText.replace(/\[🎤 .*\]$/, '').trimEnd();
                if (interim) {
                    els.input.value = (baseText ? baseText + ' ' : '') + finalTranscript + '[🎤 ' + interim + ']';
                } else {
                    els.input.value = (baseText ? baseText + ' ' : '') + finalTranscript;
                }
                Utils.autoResize(els.input);
                updateInputState();
            }
        };

        recognition.onerror = (event) => {
            if (event.error === 'no-speech') {
                Utils.showToast('ไม่ได้ยินเสียง ลองพูดอีกครั้ง', 'info');
            } else if (event.error === 'not-allowed') {
                Utils.showToast('กรุณาอนุญาตให้ใช้ไมโครโฟน', 'error');
            } else if (event.error !== 'aborted') {
                Utils.showToast(`Voice error: ${event.error}`, 'error');
            }
            stopVoiceInput();
        };

        recognition.onend = () => {
            _voiceIsListening = false;
            setVoiceListeningState(false);
            _voiceRecognition = null;

            // Clean up interim brackets
            if (els.input) {
                els.input.value = els.input.value.replace(/\[🎤 .*\]$/, '').trimEnd();
                Utils.autoResize(els.input);
                updateInputState();
            }
        };

        try {
            recognition.start();
        } catch (err) {
            Utils.showToast('ไม่สามารถเริ่ม Voice Input ได้', 'error');
        }
    }

    function stopVoiceInput() {
        if (_voiceRecognition) {
            try {
                _voiceRecognition.stop();
            } catch {
                // Already stopped
            }
        }
        _voiceIsListening = false;
        setVoiceListeningState(false);
        _voiceRecognition = null;
    }

    function setVoiceListeningState(listening) {
        if (els.voiceBtn) {
            els.voiceBtn.classList.toggle('recording', listening);
            els.voiceBtn.title = listening ? 'หยุดฟัง' : 'Voice input (พูดเพื่อพิมพ์)';
        }
        if (els.voiceRecordingRing) {
            els.voiceRecordingRing.classList.toggle('hidden', !listening);
        }
    }

    /* ============================================================ */

    function persistActiveChat() {
        if (currentChatId) {
            localStorage.setItem(ACTIVE_CHAT_KEY, currentChatId);
        } else {
            localStorage.removeItem(ACTIVE_CHAT_KEY);
        }
    }

    function newChat(focus = true) {
        if (isStreaming) {
            stopStreaming();
        }

        currentChatId = null;
        persistActiveChat();

        if (els.input) {
            els.input.value = '';
            Utils.autoResize(els.input);
        }

        clearPendingFiles();
        setWelcomeVisible(true);
        renderHistory(lastSearchQuery);
        updateInputState();

        if (focus && els.input) {
            els.input.focus();
        }
    }

    function ensureChatForMessage(firstMessage) {
        if (currentChatId && ChatHistory.getById(currentChatId)) {
            return ChatHistory.getById(currentChatId);
        }

        const chat = ChatHistory.create(Utils.generateTitle(firstMessage));
        currentChatId = chat.id;
        persistActiveChat();
        return chat;
    }

    function loadChat(chatId) {
        const chat = ChatHistory.getById(chatId);
        if (!chat) {
            newChat(false);
            return;
        }

        currentChatId = chat.id;
        persistActiveChat();
        renderCurrentChat();
        renderHistory(lastSearchQuery);

        if (els.input) {
            els.input.focus();
        }
    }

    function renderCurrentChat() {
        const chat = currentChatId ? ChatHistory.getById(currentChatId) : null;
        const hasMessages = Boolean(chat && Array.isArray(chat.messages) && chat.messages.length > 0);
        setWelcomeVisible(!hasMessages);

        if (!hasMessages || !els.messages) {
            return;
        }

        els.messages.innerHTML = '';
        chat.messages.forEach((message, index) => {
            els.messages.appendChild(createMessageElement(message, index, chat.messages));
        });

        scrollToBottom(false);
    }

    function createMessageElement(message, index, allMessages) {
        const messageEl = document.createElement('article');
        messageEl.className = `message ${message.role === 'assistant' ? 'assistant' : 'user'}`;
        messageEl.dataset.messageIndex = String(index);

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        if (message.role === 'assistant') {
            const avatarImg = document.createElement('img');
            avatarImg.src = 'logo.png';
            avatarImg.alt = 'xzc.ai';
            avatarImg.className = 'avatar-logo-img';
            avatar.appendChild(avatarImg);
        } else {
            avatar.textContent = 'Y';
        }

        const content = document.createElement('div');
        content.className = 'message-content';

        // Render file attachment chips (📎 lines at the end of user messages)
        if (message.role === 'user') {
            const lines = (message.content || '').split('\n');
            const attachmentLines = lines.filter((l) => l.trim().startsWith('📎 '));
            const textLines = lines.filter((l) => !l.trim().startsWith('📎 '));
            const textContent = textLines.join('\n').trim();

            if (attachmentLines.length > 0) {
                attachmentLines.forEach((line) => {
                    const chip = document.createElement('div');
                    chip.className = 'message-file-attachment';
                    const filename = line.trim().slice(2).trim();
                    const icon = document.createElement('span');
                    icon.className = 'file-icon';
                    icon.textContent = getIconForFilename(filename);
                    const name = document.createElement('span');
                    name.textContent = filename;
                    chip.append(icon, name);
                    content.appendChild(chip);
                });
            }

            if (textContent) {
                const textDiv = document.createElement('div');
                textDiv.innerHTML = renderMarkdown(textContent);
                content.appendChild(textDiv);
            }
        } else {
            content.innerHTML = renderMarkdown(message.content || '');
        }

        const actions = createMessageActions(message, index, allMessages);
        if (actions) {
            content.appendChild(actions);
        }

        messageEl.append(avatar, content);
        return messageEl;
    }

    function getIconForFilename(filename) {
        const ext = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return '🖼️';
        if (ext === 'pdf') return '📄';
        if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'go', 'rb', 'php', 'c', 'cpp', 'h', 'rs', 'sh'].includes(ext)) return '💻';
        if (['html', 'css', 'xml'].includes(ext)) return '🌐';
        if (['json', 'yaml', 'yml'].includes(ext)) return '⚙️';
        if (ext === 'csv') return '📊';
        return '📝';
    }

    function createMessageActions(message, index, allMessages) {
        const actions = document.createElement('div');
        actions.className = 'message-actions';

        const copyBtn = document.createElement('button');
        copyBtn.className = 'action-btn';
        copyBtn.type = 'button';
        copyBtn.title = 'Copy message';
        copyBtn.innerHTML = `${icons.copy}<span>Copy</span>`;
        copyBtn.addEventListener('click', async () => {
            const ok = await Utils.copyToClipboard(message.content || '');
            Utils.showToast(ok ? 'Copied message.' : 'Could not copy message.', ok ? 'success' : 'error');
        });
        actions.appendChild(copyBtn);

        const isLastAssistant =
            message.role === 'assistant' &&
            Array.isArray(allMessages) &&
            index === allMessages.length - 1;

        if (isLastAssistant) {
            const regenBtn = document.createElement('button');
            regenBtn.className = 'action-btn';
            regenBtn.type = 'button';
            regenBtn.title = 'Regenerate response';
            regenBtn.innerHTML = `${icons.refresh}<span>Regenerate</span>`;
            regenBtn.addEventListener('click', () => regenerateLastResponse());
            actions.appendChild(regenBtn);
        }

        return actions;
    }

    function renderMarkdown(content) {
        if (typeof MarkdownParser !== 'undefined' && MarkdownParser.parse) {
            return MarkdownParser.parse(content || '');
        }
        return Utils.escapeHtml(content || '').replace(/\n/g, '<br>');
    }

    function setWelcomeVisible(isVisible) {
        if (!els.welcome || !els.chatContainer) {
            return;
        }

        els.welcome.classList.toggle('hidden', !isVisible);
        els.chatContainer.classList.toggle('hidden', isVisible);
    }

    function updateInputState() {
        if (!els.input || !els.sendBtn) {
            return;
        }

        const text = els.input.value.trim();
        const tokenCount = Utils.estimateTokens(text);

        if (els.tokenEstimate) {
            els.tokenEstimate.textContent = tokenCount > 0 ? `~${tokenCount} tokens` : '';
            els.tokenEstimate.classList.toggle('hidden', tokenCount === 0);
        }

        const hasContent = text.length > 0 || pendingFiles.length > 0;
        els.sendBtn.disabled = !isStreaming && !hasContent;
    }

    function setStreamingState(nextValue) {
        isStreaming = nextValue;

        if (els.sendBtn) {
            els.sendBtn.classList.toggle('streaming', isStreaming);
            els.sendBtn.disabled = false;
            els.sendBtn.title = isStreaming ? 'Stop generating' : 'Send message (Enter)';
        }

        if (!isStreaming) {
            updateInputState();
        }
    }

    async function sendCurrentMessage() {
        if (isStreaming) {
            return;
        }

        const text = els.input ? els.input.value.trim() : '';
        const hasFiles = pendingFiles.length > 0;

        if (!text && !hasFiles) {
            updateInputState();
            return;
        }

        const chat = ensureChatForMessage(text || pendingFiles[0].name);
        const existingMessages = Array.isArray(chat.messages) ? chat.messages : [];

        if (existingMessages.length === 0) {
            ChatHistory.rename(chat.id, Utils.generateTitle(text || pendingFiles[0].name));
        }

        // Build the stored message content (text only for history display)
        const displayText = text;

        // Build full context for the API (prepend file text content)
        const fileContext = buildFileContext();
        const apiContent = fileContext + (text || '');

        // Store only the display text + file names in history
        const fileNote = pendingFiles.length > 0
            ? '\n\n' + pendingFiles.map((f) => `📎 ${f.name}`).join('\n')
            : '';
        const storedContent = (displayText || '') + fileNote;

        ChatHistory.addMessage(chat.id, 'user', storedContent.trim() || '[File attachment]');
        currentChatId = chat.id;
        persistActiveChat();

        // Capture files for API call before clearing
        const filesForApi = [...pendingFiles];

        if (els.input) {
            els.input.value = '';
            Utils.autoResize(els.input);
        }

        clearPendingFiles();
        renderCurrentChat();
        renderHistory(lastSearchQuery);
        updateInputState();
        await generateAssistantResponse(apiContent, filesForApi);
    }

    async function generateAssistantResponse(overrideLastContent = null, filesForApi = []) {
        const chat = currentChatId ? ChatHistory.getById(currentChatId) : null;
        if (!chat || !Array.isArray(chat.messages)) {
            return;
        }

        // Build API messages — replace last user message content with enriched version if needed
        let requestMessages = chat.messages.slice();
        if (overrideLastContent !== null && requestMessages.length > 0) {
            const lastIdx = requestMessages.length - 1;
            if (requestMessages[lastIdx].role === 'user') {
                requestMessages = [
                    ...requestMessages.slice(0, lastIdx),
                    { role: 'user', content: overrideLastContent }
                ];
            }
        }

        ChatHistory.addMessage(chat.id, 'assistant', '');
        renderCurrentChat();
        renderHistory(lastSearchQuery);
        showTyping(true);

        const assistantIndex = ChatHistory.getById(chat.id).messages.length - 1;
        const contentEl = els.messages
            ? els.messages.querySelector(`[data-message-index="${assistantIndex}"] .message-content`)
            : null;

        let accumulated = '';
        let firstTokenReceived = false;
        abortController = new AbortController();
        setStreamingState(true);

        try {
            accumulated = await XzcAPI.streamChat({
                messages: requestMessages,
                signal: abortController.signal,
                onToken: (_token, fullText) => {
                    if (!firstTokenReceived) {
                        firstTokenReceived = true;
                        showTyping(false);
                    }

                    accumulated = fullText;
                    updateAssistantElement(contentEl, accumulated, true);
                    saveStreamingContent(chat.id, accumulated);
                    scrollToBottom(true);
                }
            });

            if (!accumulated.trim()) {
                accumulated = 'I did not receive any response from the selected model.';
            }
        } catch (error) {
            showTyping(false);

            if (error.name === 'AbortError') {
                accumulated = accumulated.trim() || 'Generation stopped.';
                Utils.showToast('Generation stopped.', 'info');
            } else if (error.code === 'missing_api_key') {
                accumulated = 'Add your API key in Settings, then send the message again. Your chat history is saved locally in this browser.';
                Utils.showToast('API key is required.', 'warning');
            } else {
                accumulated = `Sorry, I could not complete that request.\n\n${error.message || 'Unknown API error.'}`;
                Utils.showToast(error.message || 'The AI request failed.', 'error');
            }
        } finally {
            ChatHistory.updateLastMessage(chat.id, accumulated);
            updateAssistantElement(contentEl, accumulated, false);
            showTyping(false);
            setStreamingState(false);
            abortController = null;
            renderHistory(lastSearchQuery);
            scrollToBottom(true);
        }
    }

    function updateAssistantElement(contentEl, content, streaming) {
        if (!contentEl) {
            return;
        }

        contentEl.innerHTML = renderMarkdown(content);
        if (streaming) {
            const cursor = document.createElement('span');
            cursor.className = 'streaming-cursor';
            contentEl.appendChild(cursor);
        } else {
            const chat = currentChatId ? ChatHistory.getById(currentChatId) : null;
            if (chat && Array.isArray(chat.messages)) {
                const lastIndex = chat.messages.length - 1;
                const actions = createMessageActions(chat.messages[lastIndex], lastIndex, chat.messages);
                contentEl.appendChild(actions);
            }
        }
    }

    function stopStreaming() {
        if (abortController) {
            abortController.abort();
        }
    }

    async function regenerateLastResponse() {
        if (isStreaming || !currentChatId) {
            return;
        }

        const chat = ChatHistory.getById(currentChatId);
        if (!chat || !Array.isArray(chat.messages) || chat.messages.length === 0) {
            return;
        }

        const lastMessage = chat.messages[chat.messages.length - 1];
        if (lastMessage.role !== 'assistant') {
            Utils.showToast('There is no assistant response to regenerate.', 'info');
            return;
        }

        chat.messages.pop();
        ChatHistory.update(chat.id, { messages: chat.messages });
        renderCurrentChat();
        await generateAssistantResponse();
    }

    function showTyping(show) {
        if (!els.typing) {
            return;
        }

        els.typing.classList.toggle('visible', show);
        els.typing.classList.toggle('hidden', !show);
        if (show) {
            scrollToBottom(true);
        }
    }

    function scrollToBottom(smooth = true) {
        if (!els.messages) {
            return;
        }

        requestAnimationFrame(() => {
            els.messages.scrollTo({
                top: els.messages.scrollHeight,
                behavior: smooth ? 'smooth' : 'auto'
            });
        });
    }

    function renderHistory(query = '') {
        if (!els.historyList) {
            return;
        }

        const chats = query && query.trim() ? ChatHistory.search(query) : ChatHistory.getAll();
        els.historyList.innerHTML = '';

        if (chats.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'chat-history-empty';
            empty.textContent = query && query.trim() ? 'No matching chats' : 'No chats yet';
            els.historyList.appendChild(empty);
            return;
        }

        const groups = groupChats(chats);
        groups.forEach((group) => {
            const groupEl = document.createElement('li');
            groupEl.className = 'date-group';
            groupEl.innerHTML = `<span class="date-group-label">${Utils.escapeHtml(group.label)}</span>`;
            els.historyList.appendChild(groupEl);

            group.chats.forEach((chat) => {
                els.historyList.appendChild(createHistoryItem(chat));
            });
        });
    }

    function groupChats(chats) {
        const map = new Map();

        chats.forEach((chat) => {
            const label = Utils.getDateGroup(chat.updatedAt || chat.createdAt || Date.now());
            if (!map.has(label)) {
                map.set(label, []);
            }
            map.get(label).push(chat);
        });

        return Array.from(map.entries()).map(([label, groupedChats]) => ({
            label,
            chats: groupedChats
        }));
    }

    function createHistoryItem(chat) {
        const item = document.createElement('li');
        item.className = 'chat-history-item';
        item.classList.toggle('active', chat.id === currentChatId);
        item.title = chat.title || 'New Chat';

        const icon = document.createElement('span');
        icon.className = 'chat-item-icon';
        icon.innerHTML = icons.chat;

        const title = document.createElement('span');
        title.className = 'chat-item-title';
        title.textContent = chat.title || 'New Chat';

        const actions = document.createElement('span');
        actions.className = 'chat-item-actions';

        const renameBtn = document.createElement('button');
        renameBtn.type = 'button';
        renameBtn.title = 'Rename chat';
        renameBtn.innerHTML = icons.edit;
        renameBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            renameChat(chat.id);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-btn';
        deleteBtn.title = 'Delete chat';
        deleteBtn.innerHTML = icons.trash;
        deleteBtn.addEventListener('click', async (event) => {
            event.stopPropagation();
            await deleteChat(chat.id);
        });

        actions.append(renameBtn, deleteBtn);
        item.append(icon, title, actions);
        item.addEventListener('click', () => loadChat(chat.id));

        return item;
    }

    function renameChat(chatId) {
        const chat = ChatHistory.getById(chatId);
        if (!chat) {
            return;
        }

        const nextTitle = window.prompt('Rename chat', chat.title || 'New Chat');
        if (nextTitle === null) {
            return;
        }

        ChatHistory.rename(chat.id, nextTitle);
        renderHistory(lastSearchQuery);
        Utils.showToast('Chat renamed.', 'success');
    }

    async function deleteChat(chatId) {
        const chat = ChatHistory.getById(chatId);
        if (!chat) {
            return;
        }

        const ok = await askConfirm(
            'Delete chat',
            `Delete "${chat.title || 'New Chat'}"? This cannot be undone.`
        );

        if (!ok) {
            return;
        }

        ChatHistory.delete(chatId);
        if (currentChatId === chatId) {
            currentChatId = null;
            persistActiveChat();
            const nextChat = ChatHistory.getAll()[0] || null;
            if (nextChat) {
                loadChat(nextChat.id);
            } else {
                newChat(false);
            }
        }

        renderHistory(lastSearchQuery);
        Utils.showToast('Chat deleted.', 'success');
    }

    async function askConfirm(title, message) {
        if (window.XzcApp && typeof window.XzcApp.confirm === 'function') {
            return window.XzcApp.confirm(title, message);
        }
        return window.confirm(message);
    }

    function exportCurrentOrAll() {
        const chat = currentChatId ? ChatHistory.getById(currentChatId) : null;
        const filename = chat
            ? `${safeFilename(chat.title || 'chat')}.json`
            : `xzc-ai-chats-${new Date().toISOString().slice(0, 10)}.json`;
        const data = chat ? ChatHistory.exportChat(chat.id) : ChatHistory.exportAll();

        if (!data) {
            Utils.showToast('Nothing to export yet.', 'info');
            return;
        }

        downloadText(filename, data, 'application/json');
        Utils.showToast(chat ? 'Chat exported.' : 'All chats exported.', 'success');
    }

    function downloadText(filename, text, type = 'text/plain') {
        const blob = new Blob([text], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    function safeFilename(name) {
        return String(name)
            .trim()
            .replace(/[^a-z0-9_-]+/gi, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 60) || 'chat';
    }

    return {
        init,
        newChat,
        loadChat,
        renderCurrentChat,
        renderHistory,
        sendCurrentMessage,
        regenerateLastResponse,
        stopStreaming,
        exportCurrentOrAll,
        isStreaming: () => isStreaming
    };
})();
