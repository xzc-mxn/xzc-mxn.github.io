/**
 * @fileoverview Chat History Manager for xzc.ai
 * Manages persistent chat storage using localStorage.
 * Provides CRUD operations, search, grouping, import/export, and streaming support.
 *
 * @requires Utils - window.Utils must be available (generateId, getDateGroup)
 */

/**
 * @typedef {Object} ChatMessage
 * @property {'user'|'assistant'|'system'} role - The role of the message sender
 * @property {string} content - The message content
 * @property {number} timestamp - Unix timestamp in milliseconds when the message was created
 */

/**
 * @typedef {Object} Chat
 * @property {string} id - Unique identifier for the chat
 * @property {string} title - Display title of the chat
 * @property {ChatMessage[]} messages - Array of messages in the chat
 * @property {number} createdAt - Unix timestamp in milliseconds when the chat was created
 * @property {number} updatedAt - Unix timestamp in milliseconds when the chat was last updated
 */

/**
 * @typedef {Object} ChatGroup
 * @property {string} label - Human-readable date group label (e.g. 'Today', 'Yesterday')
 * @property {Chat[]} chats - Array of chats belonging to this group
 */

window.ChatHistory = {

    /**
     * The localStorage key used to persist all chat data.
     * @type {string}
     */
    STORAGE_KEY: 'xzc_ai_chats',

    // ─────────────────────────────────────────────
    //  Private helpers
    // ─────────────────────────────────────────────

    /**
     * Load the chats array from localStorage.
     * Returns an empty array when the stored value is missing, corrupt, or not an array.
     *
     * @private
     * @returns {Chat[]} The array of stored chats
     */
    _load() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (!raw) {
                return [];
            }
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            console.error('[ChatHistory] Failed to load chats from localStorage:', err);
            return [];
        }
    },

    /**
     * Save the chats array to localStorage.
     *
     * @private
     * @param {Chat[]} chats - The complete array of chats to persist
     */
    _save(chats) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(chats));
        } catch (err) {
            console.error('[ChatHistory] Failed to save chats to localStorage:', err);
        }
    },

    // ─────────────────────────────────────────────
    //  Read operations
    // ─────────────────────────────────────────────

    /**
     * Retrieve every chat, sorted by `updatedAt` descending (most recent first).
     *
     * @returns {Chat[]} Sorted array of all chats
     */
    getAll() {
        const chats = this._load();
        return chats.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    },

    /**
     * Retrieve a single chat by its unique ID.
     *
     * @param {string} id - The chat ID to look up
     * @returns {Chat|null} The matching chat, or `null` if not found
     */
    getById(id) {
        if (!id) {
            return null;
        }
        const chats = this._load();
        return chats.find((chat) => chat.id === id) || null;
    },

    // ─────────────────────────────────────────────
    //  Write operations
    // ─────────────────────────────────────────────

    /**
     * Create a new chat with an auto-generated ID and persist it.
     *
     * @param {string} [title='New Chat'] - The initial title for the chat
     * @returns {Chat} The newly created chat object
     */
    create(title = 'New Chat') {
        const now = Date.now();
        const chat = {
            id: Utils.generateId(),
            title: typeof title === 'string' && title.trim() ? title.trim() : 'New Chat',
            messages: [],
            createdAt: now,
            updatedAt: now,
        };

        const chats = this._load();
        chats.push(chat);
        this._save(chats);

        return chat;
    },

    /**
     * Merge arbitrary data into an existing chat and update its `updatedAt` timestamp.
     *
     * @param {string} id - The chat ID to update
     * @param {Partial<Chat>} data - Key/value pairs to merge into the chat
     * @returns {Chat|null} The updated chat, or `null` if the ID was not found
     */
    update(id, data) {
        if (!id) {
            return null;
        }
        const chats = this._load();
        const index = chats.findIndex((chat) => chat.id === id);
        if (index === -1) {
            return null;
        }

        Object.assign(chats[index], data, { updatedAt: Date.now() });
        this._save(chats);

        return chats[index];
    },

    /**
     * Append a new message to an existing chat.
     *
     * @param {string} chatId - The chat to add the message to
     * @param {'user'|'assistant'|'system'} role - The message role
     * @param {string} content - The message content
     * @returns {ChatMessage|null} The newly created message, or `null` if the chat was not found
     */
    addMessage(chatId, role, content) {
        if (!chatId) {
            return null;
        }
        const chats = this._load();
        const chat = chats.find((c) => c.id === chatId);
        if (!chat) {
            return null;
        }

        // Ensure the messages array exists
        if (!Array.isArray(chat.messages)) {
            chat.messages = [];
        }

        /** @type {ChatMessage} */
        const message = {
            role: role,
            content: content,
            timestamp: Date.now(),
        };

        chat.messages.push(message);
        chat.updatedAt = Date.now();
        this._save(chats);

        return message;
    },

    /**
     * Update the content of the last message in a chat.
     * Designed for streaming scenarios where the assistant response is built incrementally.
     *
     * @param {string} chatId - The chat whose last message should be updated
     * @param {string} content - The new (or appended) content for the last message
     * @returns {ChatMessage|null} The updated message, or `null` if no messages exist
     */
    updateLastMessage(chatId, content) {
        if (!chatId) {
            return null;
        }
        const chats = this._load();
        const chat = chats.find((c) => c.id === chatId);
        if (!chat || !Array.isArray(chat.messages) || chat.messages.length === 0) {
            return null;
        }

        const lastMessage = chat.messages[chat.messages.length - 1];
        lastMessage.content = content;
        chat.updatedAt = Date.now();
        this._save(chats);

        return lastMessage;
    },

    /**
     * Delete a chat by its ID.
     *
     * @param {string} id - The chat ID to remove
     * @returns {boolean} `true` if the chat was found and deleted, `false` otherwise
     */
    delete(id) {
        if (!id) {
            return false;
        }
        const chats = this._load();
        const initialLength = chats.length;
        const filtered = chats.filter((chat) => chat.id !== id);

        if (filtered.length === initialLength) {
            return false;
        }

        this._save(filtered);
        return true;
    },

    /**
     * Rename a chat.
     *
     * @param {string} id - The chat ID to rename
     * @param {string} newTitle - The new title
     * @returns {Chat|null} The updated chat, or `null` if the ID was not found
     */
    rename(id, newTitle) {
        if (!id || typeof newTitle !== 'string') {
            return null;
        }
        return this.update(id, { title: newTitle.trim() || 'New Chat' });
    },

    // ─────────────────────────────────────────────
    //  Search & grouping
    // ─────────────────────────────────────────────

    /**
     * Search chats whose title or message content matches the query (case-insensitive).
     *
     * @param {string} query - The search string
     * @returns {Chat[]} Array of matching chats, sorted by `updatedAt` descending
     */
    search(query) {
        if (!query || typeof query !== 'string') {
            return this.getAll();
        }

        const lowerQuery = query.toLowerCase().trim();
        if (!lowerQuery) {
            return this.getAll();
        }

        const chats = this._load();

        const results = chats.filter((chat) => {
            // Check title
            if (chat.title && chat.title.toLowerCase().includes(lowerQuery)) {
                return true;
            }

            // Check message contents
            if (Array.isArray(chat.messages)) {
                return chat.messages.some(
                    (msg) => msg.content && msg.content.toLowerCase().includes(lowerQuery)
                );
            }

            return false;
        });

        return results.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    },

    /**
     * Group all chats by date label using `Utils.getDateGroup`.
     * Only groups that contain at least one chat are included.
     *
     * @returns {ChatGroup[]} Ordered array of date groups containing their chats
     */
    getGrouped() {
        const chats = this.getAll(); // already sorted by updatedAt desc
        /** @type {Map<string, Chat[]>} */
        const groupMap = new Map();

        for (const chat of chats) {
            const label = Utils.getDateGroup(chat.updatedAt || chat.createdAt || Date.now());
            if (!groupMap.has(label)) {
                groupMap.set(label, []);
            }
            groupMap.get(label).push(chat);
        }

        /** @type {ChatGroup[]} */
        const groups = [];
        for (const [label, groupChats] of groupMap) {
            groups.push({ label, chats: groupChats });
        }

        return groups;
    },

    // ─────────────────────────────────────────────
    //  Import / export
    // ─────────────────────────────────────────────

    /**
     * Export a single chat as a formatted JSON string.
     *
     * @param {string} id - The chat ID to export
     * @returns {string|null} JSON string of the chat, or `null` if not found
     */
    exportChat(id) {
        const chat = this.getById(id);
        if (!chat) {
            return null;
        }
        return JSON.stringify(chat, null, 2);
    },

    /**
     * Export all chats as a formatted JSON string.
     *
     * @returns {string} JSON string of the entire chats array
     */
    exportAll() {
        const chats = this.getAll();
        return JSON.stringify(chats, null, 2);
    },

    /**
     * Import chats from a JSON string.
     * Accepts either a single chat object or an array of chat objects.
     * Existing chats with duplicate IDs are overwritten.
     *
     * @param {string} jsonString - The JSON string to parse and import
     * @returns {number} The number of chats successfully imported
     */
    importChats(jsonString) {
        if (!jsonString || typeof jsonString !== 'string') {
            console.error('[ChatHistory] importChats: invalid input');
            return 0;
        }

        let parsed;
        try {
            parsed = JSON.parse(jsonString);
        } catch (err) {
            console.error('[ChatHistory] importChats: failed to parse JSON:', err);
            return 0;
        }

        // Normalise to an array
        const incoming = Array.isArray(parsed) ? parsed : [parsed];

        // Filter out entries that aren't plausible chat objects
        const valid = incoming.filter(
            (item) =>
                item &&
                typeof item === 'object' &&
                typeof item.id === 'string' &&
                item.id.length > 0
        );

        if (valid.length === 0) {
            return 0;
        }

        const chats = this._load();

        for (const imported of valid) {
            // Ensure essential fields
            const now = Date.now();
            if (!imported.title || typeof imported.title !== 'string') {
                imported.title = 'Imported Chat';
            }
            if (!Array.isArray(imported.messages)) {
                imported.messages = [];
            }
            if (typeof imported.createdAt !== 'number') {
                imported.createdAt = now;
            }
            if (typeof imported.updatedAt !== 'number') {
                imported.updatedAt = now;
            }

            // Replace existing or append
            const existingIndex = chats.findIndex((c) => c.id === imported.id);
            if (existingIndex !== -1) {
                chats[existingIndex] = imported;
            } else {
                chats.push(imported);
            }
        }

        this._save(chats);
        return valid.length;
    },

    // ─────────────────────────────────────────────
    //  Destructive operations
    // ─────────────────────────────────────────────

    /**
     * Remove all chats from localStorage.
     */
    clearAll() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (err) {
            console.error('[ChatHistory] Failed to clear chats:', err);
        }
    },
};
