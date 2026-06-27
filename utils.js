/**
 * xzc.ai - Utility Module
 * 
 * A collection of pure vanilla JS utility functions for the xzc.ai chat website.
 * Provides helpers for ID generation, date formatting, DOM manipulation,
 * clipboard operations, throttling/debouncing, and more.
 * 
 * @namespace Utils
 */
window.Utils = (() => {
    'use strict';

    // =========================================================================
    // 1. ID Generation
    // =========================================================================

    /**
     * Generate a UUID v4 style unique string.
     * Uses crypto.randomUUID() when available, with a manual fallback
     * for older browsers that don't support the Web Crypto API method.
     * 
     * @returns {string} A UUID v4 formatted string (e.g. "550e8400-e29b-41d4-a716-446655440000")
     */
    function generateId() {
        try {
            if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
                return crypto.randomUUID();
            }
        } catch (e) {
            // Fallback below
        }

        // Manual UUID v4 fallback using crypto.getRandomValues or Math.random
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r;
            if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
                const buf = new Uint8Array(1);
                crypto.getRandomValues(buf);
                r = buf[0] % 16;
            } else {
                r = (Math.random() * 16) | 0;
            }
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    // =========================================================================
    // 2. Date Grouping
    // =========================================================================

    /**
     * Format a date relative to now into a human-readable group label.
     * 
     * Groups:
     * - "Today" — same calendar day
     * - "Yesterday" — the day before today
     * - "Previous 7 Days" — within the last 7 days (excluding today & yesterday)
     * - "Previous 30 Days" — within the last 30 days (excluding the above)
     * - "Month Year" — anything older (e.g. "January 2025")
     * 
     * @param {Date|string|number} date - The date to classify. Accepts Date objects, 
     *                                     ISO strings, or timestamps.
     * @returns {string} The group label for the given date.
     */
    function getDateGroup(date) {
        const inputDate = new Date(date);

        // Guard against invalid dates
        if (isNaN(inputDate.getTime())) {
            return 'Unknown';
        }

        const now = new Date();

        // Create midnight-aligned dates for accurate day comparison
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const target = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());

        const diffMs = today.getTime() - target.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today';
        }
        if (diffDays === 1) {
            return 'Yesterday';
        }
        if (diffDays <= 7) {
            return 'Previous 7 Days';
        }
        if (diffDays <= 30) {
            return 'Previous 30 Days';
        }

        // For older dates, return "Month Year" (e.g. "March 2025")
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return `${monthNames[inputDate.getMonth()]} ${inputDate.getFullYear()}`;
    }

    // =========================================================================
    // 3. Time Formatting
    // =========================================================================

    /**
     * Format a timestamp into a human-readable time string (e.g. "3:45 PM").
     * 
     * @param {Date|string|number} date - The date/time to format. Accepts Date objects,
     *                                     ISO strings, or timestamps.
     * @returns {string} Formatted time string like "3:45 PM", or an empty string 
     *                   if the date is invalid.
     */
    function formatTime(date) {
        const d = new Date(date);

        if (isNaN(d.getTime())) {
            return '';
        }

        return d.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    // =========================================================================
    // 4. Debounce
    // =========================================================================

    /**
     * Create a debounced version of a function that delays invocation until
     * after `delay` milliseconds have elapsed since the last call.
     * 
     * @param {Function} fn - The function to debounce.
     * @param {number} delay - The debounce delay in milliseconds.
     * @returns {Function} The debounced function. Call `.cancel()` on the returned 
     *                     function to clear any pending invocation.
     */
    function debounce(fn, delay) {
        let timeoutId = null;

        const debounced = function (...args) {
            // Clear any previously scheduled call
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                timeoutId = null;
                fn.apply(this, args);
            }, delay);
        };

        /**
         * Cancel any pending debounced invocation.
         */
        debounced.cancel = function () {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        };

        return debounced;
    }

    // =========================================================================
    // 5. Throttle
    // =========================================================================

    /**
     * Create a throttled version of a function that only executes at most once 
     * every `limit` milliseconds. Uses a trailing-edge call to ensure the last 
     * invocation within a throttle window is not lost.
     * 
     * @param {Function} fn - The function to throttle.
     * @param {number} limit - The minimum interval between executions in milliseconds.
     * @returns {Function} The throttled function.
     */
    function throttle(fn, limit) {
        let inThrottle = false;
        let lastArgs = null;
        let lastContext = null;

        return function (...args) {
            if (!inThrottle) {
                // Execute immediately on the leading edge
                fn.apply(this, args);
                inThrottle = true;

                setTimeout(() => {
                    inThrottle = false;

                    // If there was a trailing call, execute it
                    if (lastArgs !== null) {
                        fn.apply(lastContext, lastArgs);
                        lastArgs = null;
                        lastContext = null;
                    }
                }, limit);
            } else {
                // Store the most recent trailing call
                lastArgs = args;
                lastContext = this;
            }
        };
    }

    // =========================================================================
    // 6. Clipboard
    // =========================================================================

    /**
     * Copy the given text to the system clipboard.
     * Uses the modern Clipboard API when available, with a fallback to the 
     * legacy `document.execCommand('copy')` approach.
     * 
     * @param {string} text - The text to copy to the clipboard.
     * @returns {Promise<boolean>} Resolves to `true` on success, `false` on failure.
     */
    async function copyToClipboard(text) {
        // Try the modern Clipboard API first
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (err) {
                console.warn('Clipboard API failed, falling back to execCommand:', err);
            }
        }

        // Fallback: create a temporary textarea, select its content, and copy
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;

            // Position off-screen to avoid visual flash
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            textarea.style.top = '-9999px';
            textarea.style.opacity = '0';

            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            const success = document.execCommand('copy');
            document.body.removeChild(textarea);

            return success;
        } catch (err) {
            console.error('Clipboard fallback failed:', err);
            return false;
        }
    }

    // =========================================================================
    // 7. Toast Notifications
    // =========================================================================

    /**
     * Display a toast notification message that auto-dismisses after 4 seconds.
     *
     * @param {string} message - The message to display in the toast.
     * @param {'success'|'error'|'info'|'warning'} [type='info'] - The toast type.
     */
    function showToast(message, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const validTypes = ['success', 'error', 'info', 'warning'];
        const safeType = validTypes.includes(type) ? type : 'info';
        const iconPaths = {
            success: '<path d="M20 6L9 17l-5-5"/>',
            error: '<path d="M18 6L6 18M6 6l12 12"/>',
            info: '<path d="M12 16v-4M12 8h.01"/><circle cx="12" cy="12" r="10"/>',
            warning: '<path d="M10.3 3.4 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.4a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${safeType}`;

        const icon = document.createElement('span');
        icon.className = 'toast-icon';
        icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${iconPaths[safeType]}</svg>`;

        const text = document.createElement('span');
        text.className = 'toast-message';
        text.textContent = message;

        const close = document.createElement('button');
        close.type = 'button';
        close.className = 'toast-close';
        close.setAttribute('aria-label', 'Dismiss notification');
        close.textContent = 'x';

        toast.append(icon, text, close);

        container.appendChild(toast);

        let timeoutId = null;
        const dismiss = () => {
            clearTimeout(timeoutId);
            toast.classList.add('exiting');
            setTimeout(() => {
                toast.remove();
            }, 260);
        };

        close.addEventListener('click', dismiss);
        timeoutId = setTimeout(dismiss, 4000);
    }

    // =========================================================================
    // 8. HTML Escaping
    // =========================================================================

    /**
     * Escape HTML special characters to prevent XSS attacks.
     * Converts `&`, `<`, `>`, `"`, and `'` to their HTML entity equivalents.
     * 
     * @param {string} str - The string to escape.
     * @returns {string} The escaped string safe for insertion into HTML.
     */
    function escapeHtml(str) {
        if (typeof str !== 'string') {
            return '';
        }

        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };

        return str.replace(/[&<>"']/g, (char) => escapeMap[char]);
    }

    // =========================================================================
    // 9. DOM Element Creation
    // =========================================================================

    /**
     * Create a DOM element with optional class name, attributes, and text content.
     * A convenient helper to reduce boilerplate when building UI elements in JS.
     * 
     * @param {string} tag - The HTML tag name (e.g. 'div', 'span', 'button').
     * @param {string} [className=''] - A space-separated string of CSS class names.
     * @param {Object<string, string>} [attributes={}] - Key-value pairs of HTML attributes 
     *        to set on the element (e.g. { id: 'my-id', 'data-value': '42' }).
     * @param {string} [textContent=''] - The text content for the element.
     * @returns {HTMLElement} The created DOM element.
     */
    function createElement(tag, className = '', attributes = {}, textContent = '') {
        const el = document.createElement(tag);

        // Apply CSS class names
        if (className && typeof className === 'string') {
            el.className = className;
        }

        // Apply attributes
        if (attributes && typeof attributes === 'object') {
            for (const [key, value] of Object.entries(attributes)) {
                el.setAttribute(key, value);
            }
        }

        // Apply text content
        if (textContent) {
            el.textContent = textContent;
        }

        return el;
    }

    // =========================================================================
    // 10. Textarea Auto-Resize
    // =========================================================================

    /**
     * Auto-resize a textarea element to fit its content, up to a maximum height.
     * Resets the height to `auto` first to get an accurate scrollHeight measurement,
     * then sets the height to the smaller of scrollHeight and maxHeight.
     * 
     * @param {HTMLTextAreaElement} textarea - The textarea element to resize.
     * @param {number} [maxHeight=200] - The maximum height in pixels.
     */
    function autoResize(textarea, maxHeight = 200) {
        if (!textarea || !(textarea instanceof HTMLTextAreaElement)) {
            return;
        }

        // Reset height to auto to get accurate scrollHeight
        textarea.style.height = 'auto';

        // Calculate the new height, capped at maxHeight
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = `${newHeight}px`;

        // Toggle overflow based on whether content exceeds max height
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }

    // =========================================================================
    // 11. Chat Title Generation
    // =========================================================================

    /**
     * Generate a short chat title from the first user message.
     * Truncates to the first 30 characters and appends '...' if the message 
     * is longer than 30 characters.
     * 
     * @param {string} message - The first user message to derive a title from.
     * @returns {string} A truncated title string, or 'New Chat' if the message 
     *                   is empty or not a string.
     */
    function generateTitle(message) {
        if (!message || typeof message !== 'string') {
            return 'New Chat';
        }

        // Trim whitespace and collapse multiple spaces
        const cleaned = message.trim().replace(/\s+/g, ' ');

        if (cleaned.length === 0) {
            return 'New Chat';
        }

        if (cleaned.length <= 30) {
            return cleaned;
        }

        return cleaned.substring(0, 30) + '...';
    }

    // =========================================================================
    // 12. Token Estimation
    // =========================================================================

    /**
     * Estimate the approximate number of tokens in a text string.
     * Uses a simple heuristic: split by whitespace to count words, 
     * then multiply by 1.3 (a common rough approximation for English text 
     * with GPT-style tokenizers).
     * 
     * @param {string} text - The text to estimate tokens for.
     * @returns {number} The estimated token count, or 0 for empty/invalid input.
     */
    function estimateTokens(text) {
        if (!text || typeof text !== 'string') {
            return 0;
        }

        const trimmed = text.trim();
        if (trimmed.length === 0) {
            return 0;
        }

        // Split on whitespace to count words
        const words = trimmed.split(/\s+/).length;

        // Multiply by 1.3 and round up for a conservative estimate
        return Math.ceil(words * 1.3);
    }

    // =========================================================================
    // Public API
    // =========================================================================

    return {
        generateId,
        getDateGroup,
        formatTime,
        debounce,
        throttle,
        copyToClipboard,
        showToast,
        escapeHtml,
        createElement,
        autoResize,
        generateTitle,
        estimateTokens
    };
})();
