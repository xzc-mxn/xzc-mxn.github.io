/**
 * @fileoverview Settings Manager for xzc.ai Chat Application.
 * Provides a complete interface for managing user preferences including
 * API configuration, theme selection, and model parameters.
 * All settings are persisted to localStorage under a single key.
 *
 * @author xzc.ai
 * @version 1.0.0
 */

/**
 * @typedef {Object} XzcSettings
 * @property {string} apiProvider - The selected API provider ('openai' | 'gemini').
 * @property {string} apiKey - The user's API key for the selected provider.
 * @property {string} model - The selected model identifier.
 * @property {string} systemPrompt - The system prompt sent with each request.
 * @property {number} temperature - The temperature parameter for generation (0-2).
 * @property {number} maxTokens - The maximum number of tokens to generate.
 * @property {string} theme - The UI theme ('dark' | 'light').
 * @property {boolean} streamResponse - Whether to stream responses incrementally.
 */

/**
 * @typedef {Object} ModelOption
 * @property {string} id - The model identifier string.
 * @property {string} name - The human-readable model name.
 */

/**
 * Global Settings Manager.
 * Handles loading, saving, and applying user settings for the xzc.ai chat app.
 * Exposes a public API on `window.Settings`.
 *
 * @namespace Settings
 */
window.Settings = (() => {
    'use strict';

    // ─── Constants ───────────────────────────────────────────────────────

    /**
     * The localStorage key used to persist all settings.
     * @type {string}
     */
    const STORAGE_KEY = 'xzc_ai_settings';

    /**
     * Default settings applied when no saved settings exist or when
     * individual keys are missing from a saved payload.
     * @type {XzcSettings}
     */
    const defaults = Object.freeze({
        apiProvider: 'gemini',
        apiKey: 'AIzaSyDxHAChzenlW54GlGV0RIRiYSuMuoF01hk',
        model: 'gemini-3.5-flash',
        systemPrompt: 'You are a helpful assistant.',
        temperature: 0.7,
        maxTokens: 4096,
        theme: 'dark',
        streamResponse: true
    });

    // ─── Internal State ──────────────────────────────────────────────────

    /**
     * The current in-memory settings object.
     * Always kept in sync with localStorage via `_save()`.
     * @type {XzcSettings}
     * @private
     */
    let _settings = { ...defaults };

    /**
     * Flag to track whether `init()` has already been called.
     * Prevents redundant initialization work.
     * @type {boolean}
     * @private
     */
    let _initialized = false;

    // ─── Provider Model Definitions ──────────────────────────────────────

    /**
     * Map of provider identifiers to their available model options.
     * @type {Object<string, ModelOption[]>}
     * @private
     */
    const _providerModels = {
        openai: [
            { id: 'gpt-4o', name: 'GPT-4o' },
            { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
            { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
            { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
        ],
        gemini: [
            { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash', category: 'text' },
            { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash Lite', category: 'text' },
            { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', category: 'text' },
            { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', category: 'text' },
            { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', category: 'text' },
            { id: 'gemini-2.0-flash-lite', name: 'Gemini 2.0 Flash Lite', category: 'text' },
            { id: 'gemini-2.5-flash-preview-image-generation', name: 'Gemini 2.5 Flash (Image Gen)', category: 'image' },
            { id: 'gemini-2.0-flash-preview-image-generation', name: 'Gemini 2.0 Flash (Image Gen)', category: 'image' }
        ]
    };

    // ─── Private Helpers ─────────────────────────────────────────────────

    /**
     * Safely query a DOM element by selector.
     * Returns `null` without throwing if the document or element is unavailable.
     *
     * @param {string} selector - A valid CSS selector string.
     * @returns {HTMLElement|null} The matched element, or null.
     * @private
     */
    function _safeQuery(selector) {
        try {
            if (typeof document === 'undefined' || !document.querySelector) {
                return null;
            }
            return document.querySelector(selector);
        } catch {
            return null;
        }
    }

    /**
     * Save the current in-memory settings to localStorage.
     * Silently catches errors (e.g. storage quota exceeded, private browsing).
     *
     * @private
     */
    function _save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(_settings));
        } catch (error) {
            console.error('[Settings] Failed to save settings to localStorage:', error);
        }
    }

    function _notifyChange(changedKeys = []) {
        try {
            window.dispatchEvent(new CustomEvent('xzc:settingschange', {
                detail: {
                    changedKeys,
                    settings: { ..._settings }
                }
            }));
        } catch {
            // Settings still persist if CustomEvent is unavailable.
        }
    }

    /**
     * Load settings from localStorage and merge them with defaults.
     * Missing keys are filled from `defaults` to ensure a complete settings object.
     * Invalid or corrupt JSON is handled gracefully by falling back to defaults.
     *
     * @returns {XzcSettings} The merged settings object.
     * @private
     */
    function _load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return { ...defaults };
            }

            const parsed = JSON.parse(raw);

            // Validate that parsed is a plain object
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
                console.warn('[Settings] Corrupt settings detected, resetting to defaults.');
                return { ...defaults };
            }

            // Merge with defaults — saved values override defaults,
            // but missing keys are filled from defaults.
            const merged = { ...defaults };
            for (const key of Object.keys(defaults)) {
                if (key in parsed && parsed[key] !== null && parsed[key] !== undefined) {
                    // Type coercion for numeric values
                    if (typeof defaults[key] === 'number') {
                        const num = Number(parsed[key]);
                        if (!Number.isNaN(num)) {
                            merged[key] = num;
                        }
                    } else if (typeof defaults[key] === 'boolean') {
                        merged[key] = Boolean(parsed[key]);
                    } else {
                        merged[key] = String(parsed[key]);
                    }
                }
            }

            return merged;
        } catch (error) {
            console.error('[Settings] Failed to load settings from localStorage:', error);
            return { ...defaults };
        }
    }

    /**
     * Update the `<option>` elements inside the model `<select>` dropdown
     * to reflect the models available for the given provider.
     *
     * @param {string} provider - The provider key (e.g. 'openai', 'gemini').
     * @private
     */
    function _updateModelSelect(provider) {
        const modelSelect = _safeQuery('#model-select');
        if (!modelSelect) return;

        const models = getModelsForProvider(provider);
        const currentModel = _settings.model;

        // Clear existing options
        modelSelect.innerHTML = '';

        // Populate with new options
        models.forEach((model) => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.name;
            modelSelect.appendChild(option);
        });

        // Attempt to preserve the current model selection if it exists
        // in the new provider's model list; otherwise select the first model
        const modelExists = models.some((m) => m.id === currentModel);
        if (modelExists) {
            modelSelect.value = currentModel;
        } else if (models.length > 0) {
            modelSelect.value = models[0].id;
            _settings.model = models[0].id;
            _save();
        }
    }

    /**
     * Test the API connection for the selected provider using the configured API key.
     * Displays a toast notification on success or failure via `Utils.showToast()`.
     *
     * @returns {Promise<void>}
     * @private
     */
    async function _testConnection() {
        const apiKey = _settings.apiKey;
        const provider = _settings.apiProvider;

        // Validate API key presence
        if (!apiKey || apiKey.trim() === '') {
            _showToast('Please enter an API key before testing the connection.', 'error');
            return;
        }

        // Provide user feedback that test is in progress
        const testBtn = _safeQuery('#test-connection-btn');
        const testLabel = testBtn ? testBtn.querySelector('span') : null;
        let originalText = '';
        if (testBtn) {
            originalText = testLabel ? testLabel.textContent : testBtn.textContent;
            if (testLabel) {
                testLabel.textContent = 'Testing...';
            } else {
                testBtn.textContent = 'Testing...';
            }
            testBtn.classList.add('loading');
            testBtn.disabled = true;
        }

        try {
            let response;

            if (provider === 'openai') {
                response = await fetch('https://api.openai.com/v1/models', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${apiKey.trim()}`
                    }
                });
            } else if (provider === 'gemini') {
                response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey.trim())}`,
                    { method: 'GET' }
                );
            } else {
                _showToast(`Unknown provider: ${provider}`, 'error');
                return;
            }

            if (response.ok) {
                _showToast(`Successfully connected to ${provider === 'openai' ? 'OpenAI' : 'Google Gemini'} API!`, 'success');
            } else {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
                _showToast(`Connection failed: ${errorMessage}`, 'error');
            }
        } catch (error) {
            _showToast(`Connection error: ${error.message || 'Network request failed.'}`, 'error');
        } finally {
            // Restore button state
            if (testBtn) {
                if (testLabel) {
                    testLabel.textContent = originalText;
                } else {
                    testBtn.textContent = originalText;
                }
                testBtn.classList.remove('loading');
                testBtn.disabled = false;
            }
        }
    }

    /**
     * Wrapper around Utils.showToast that handles cases where Utils may not be loaded.
     *
     * @param {string} message - The toast message to display.
     * @param {string} [type='info'] - The toast type ('success', 'error', 'info', 'warning').
     * @private
     */
    function _showToast(message, type = 'info') {
        if (typeof Utils !== 'undefined' && typeof Utils.showToast === 'function') {
            Utils.showToast(message, type);
        } else {
            console.log(`[Settings Toast] (${type}): ${message}`);
        }
    }

    // ─── Public API ──────────────────────────────────────────────────────

    /**
     * Initialize the Settings module.
     * Loads persisted settings from localStorage (or falls back to defaults),
     * applies the saved theme, populates form fields if the DOM is available,
     * and sets up event listeners.
     *
     * This method is safe to call before the DOM is fully ready — all DOM
     * operations are guarded and will silently skip if elements are not found.
     *
     * @returns {void}
     */
    function init() {
        if (_initialized) return;

        // Load settings from storage
        _settings = _load();

        // Apply the persisted theme immediately (works before DOMContentLoaded
        // as long as the <html> element exists)
        applyTheme(_settings.theme);

        // Populate form fields (guarded — safe if DOM not ready)
        populateForm();

        // Setup event listeners (guarded — safe if DOM not ready)
        setupListeners();

        _initialized = true;
        console.log('[Settings] Initialized successfully.');
    }

    /**
     * Get the value of a specific setting.
     *
     * @param {string} key - The settings key to retrieve.
     * @returns {*} The setting value, or `undefined` if the key doesn't exist.
     */
    function get(key) {
        if (!key || typeof key !== 'string') return undefined;
        return Object.prototype.hasOwnProperty.call(_settings, key) ? _settings[key] : undefined;
    }

    /**
     * Set a specific setting value and persist to localStorage.
     *
     * @param {string} key - The settings key to update.
     * @param {*} value - The new value for the setting.
     * @returns {void}
     */
    function set(key, value) {
        if (!key || typeof key !== 'string') return;
        _settings[key] = value;
        _save();
        if (key === 'theme') {
            applyTheme(value);
        }
        _notifyChange([key]);
    }

    /**
     * Get a shallow copy of all current settings.
     *
     * @returns {XzcSettings} A copy of the current settings object.
     */
    function getAll() {
        return { ..._settings };
    }

    /**
     * Get the current API key.
     *
     * @returns {string} The configured API key.
     */
    function getApiKey() {
        return get('apiKey');
    }

    /**
     * Get the current API provider.
     *
     * @returns {string} The configured API provider identifier.
     */
    function getProvider() {
        return get('apiProvider');
    }

    /**
     * Get the currently selected model identifier.
     *
     * @returns {string} The configured model ID.
     */
    function getModel() {
        return get('model');
    }

    /**
     * Get the current system prompt.
     *
     * @returns {string} The configured system prompt.
     */
    function getSystemPrompt() {
        return get('systemPrompt');
    }

    /**
     * Get the current temperature setting.
     *
     * @returns {number} The configured temperature value.
     */
    function getTemperature() {
        return get('temperature');
    }

    /**
     * Get the current maximum tokens setting.
     *
     * @returns {number} The configured max tokens value.
     */
    function getMaxTokens() {
        return get('maxTokens');
    }

    /**
     * Get the current theme setting.
     *
     * @returns {string} The configured theme identifier.
     */
    function getTheme() {
        return get('theme');
    }

    /**
     * Apply a theme by setting the `data-theme` attribute on `<html>`.
     * Falls back to 'dark' if the provided theme value is falsy.
     *
     * @param {string} theme - The theme identifier to apply (e.g. 'dark', 'light').
     * @returns {void}
     */
    function applyTheme(theme) {
        const resolvedTheme = theme || 'dark';
        try {
            if (typeof document !== 'undefined' && document.documentElement) {
                document.documentElement.setAttribute('data-theme', resolvedTheme);
            }
        } catch (error) {
            console.error('[Settings] Failed to apply theme:', error);
        }
    }

    /**
     * Open the settings modal by adding the 'open' class to `#settings-modal`.
     *
     * @returns {void}
     */
    function openModal() {
        const modal = _safeQuery('#settings-modal');
        if (modal) {
            // Refresh form values before showing
            populateForm();
            modal.classList.add('open');
        }
    }

    /**
     * Close the settings modal by removing the 'open' class from `#settings-modal`.
     *
     * @returns {void}
     */
    function closeModal() {
        const modal = _safeQuery('#settings-modal');
        if (modal) {
            modal.classList.remove('open');
        }
    }

    /**
     * Read all form input values from the settings modal and persist them.
     * If the theme has changed, it is applied immediately.
     * If the provider has changed, the model dropdown is updated.
     *
     * Form element IDs:
     * - `#api-provider-select` → apiProvider
     * - `#api-key-input` → apiKey
     * - `#model-select` → model
     * - `#system-prompt-input` → systemPrompt
     * - `#temperature-range` → temperature
     * - `#max-tokens-input` → maxTokens
     * - `#theme-select` → theme
     * - `#stream-toggle` → streamResponse
     *
     * @returns {void}
     */
    function saveFromForm() {
        const providerEl = _safeQuery('#api-provider-select');
        const apiKeyEl = _safeQuery('#api-key-input');
        const modelEl = _safeQuery('#model-select');
        const systemPromptEl = _safeQuery('#system-prompt-input');
        const temperatureEl = _safeQuery('#temperature-range');
        const maxTokensEl = _safeQuery('#max-tokens-input');
        const themeEl = _safeQuery('#theme-select');
        const streamEl = _safeQuery('#stream-toggle');

        // Track previous values for change detection
        const previousTheme = _settings.theme;
        const previousProvider = _settings.apiProvider;

        // Read values from form elements (guarded)
        if (providerEl) _settings.apiProvider = providerEl.value;
        if (apiKeyEl) _settings.apiKey = apiKeyEl.value.trim();
        if (modelEl) _settings.model = modelEl.value;
        if (systemPromptEl) _settings.systemPrompt = systemPromptEl.value;

        if (temperatureEl) {
            const temp = parseFloat(temperatureEl.value);
            if (!Number.isNaN(temp)) {
                _settings.temperature = temp;
            }
        }

        if (maxTokensEl) {
            const tokens = parseInt(maxTokensEl.value, 10);
            if (!Number.isNaN(tokens) && tokens > 0) {
                _settings.maxTokens = tokens;
            }
        }

        if (themeEl) _settings.theme = themeEl.value;

        if (streamEl) {
            // Handle both checkbox and select element types
            _settings.streamResponse = streamEl.type === 'checkbox'
                ? streamEl.checked
                : streamEl.value === 'true';
        }

        // Persist changes
        _save();

        // Apply theme if it changed
        if (_settings.theme !== previousTheme) {
            applyTheme(_settings.theme);
        }

        // Update model list if provider changed
        if (_settings.apiProvider !== previousProvider) {
            _updateModelSelect(_settings.apiProvider);
        }

        _notifyChange([
            'apiProvider',
            'apiKey',
            'model',
            'systemPrompt',
            'temperature',
            'maxTokens',
            'theme',
            'streamResponse'
        ]);
    }

    /**
     * Populate all form inputs in the settings modal with the current settings values.
     * Every DOM operation is guarded so this method is safe to call before the DOM is ready.
     *
     * @returns {void}
     */
    function populateForm() {
        const providerEl = _safeQuery('#api-provider-select');
        const apiKeyEl = _safeQuery('#api-key-input');
        const modelEl = _safeQuery('#model-select');
        const systemPromptEl = _safeQuery('#system-prompt-input');
        const temperatureEl = _safeQuery('#temperature-range');
        const maxTokensEl = _safeQuery('#max-tokens-input');
        const themeEl = _safeQuery('#theme-select');
        const streamEl = _safeQuery('#stream-toggle');
        const temperatureValueEl = _safeQuery('#temperature-value');

        if (providerEl) providerEl.value = _settings.apiProvider;

        // Update model dropdown options for the current provider first
        _updateModelSelect(_settings.apiProvider);

        if (apiKeyEl) apiKeyEl.value = _settings.apiKey;
        if (modelEl) modelEl.value = _settings.model;
        if (systemPromptEl) systemPromptEl.value = _settings.systemPrompt;
        if (temperatureEl) temperatureEl.value = _settings.temperature;
        if (maxTokensEl) maxTokensEl.value = _settings.maxTokens;
        if (themeEl) themeEl.value = _settings.theme;

        if (streamEl) {
            if (streamEl.type === 'checkbox') {
                streamEl.checked = _settings.streamResponse;
            } else {
                streamEl.value = String(_settings.streamResponse);
            }
        }

        // Display the current temperature value next to the range slider
        if (temperatureValueEl) {
            temperatureValueEl.textContent = _settings.temperature;
        }
    }

    /**
     * Set up DOM event listeners for the settings modal and form controls.
     * All element lookups are guarded, so this is safe to call before DOM is ready.
     *
     * Listeners attached:
     * - `#settings-close-btn` click → closeModal
     * - `#settings-overlay` click → closeModal
     * - All form inputs change → saveFromForm
     * - `#api-provider-select` change → update model dropdown
     * - `#temperature-range` input → update displayed temperature value
     * - `#test-connection-btn` click → test API connection
     *
     * @returns {void}
     */
    function setupListeners() {
        // Close button
        const closeBtn = _safeQuery('#settings-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal());
        }

        // Overlay click to close
        const overlay = _safeQuery('#settings-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => closeModal());
        }

        // Form input IDs that should trigger auto-save on change
        const formInputIds = [
            '#api-provider-select',
            '#api-key-input',
            '#model-select',
            '#system-prompt-input',
            '#temperature-range',
            '#max-tokens-input',
            '#theme-select',
            '#stream-toggle'
        ];

        formInputIds.forEach((selector) => {
            const el = _safeQuery(selector);
            if (el) {
                el.addEventListener('change', () => saveFromForm());
            }
        });

        // Provider change → update model list
        const providerSelect = _safeQuery('#api-provider-select');
        if (providerSelect) {
            providerSelect.addEventListener('change', () => {
                _updateModelSelect(providerSelect.value);
            });
        }

        // Temperature range → live value display
        const temperatureRange = _safeQuery('#temperature-range');
        const temperatureValue = _safeQuery('#temperature-value');
        if (temperatureRange && temperatureValue) {
            temperatureRange.addEventListener('input', () => {
                temperatureValue.textContent = temperatureRange.value;
            });
        }

        // Test connection button
        const testBtn = _safeQuery('#test-connection-btn');
        if (testBtn) {
            testBtn.addEventListener('click', () => _testConnection());
        }
    }

    /**
     * Get the list of available models for a given API provider.
     *
     * @param {string} provider - The provider key (e.g. 'openai', 'gemini').
     * @returns {ModelOption[]} An array of model option objects with `id` and `name`.
     */
    function getModelsForProvider(provider) {
        if (!provider || typeof provider !== 'string') {
            return _providerModels.openai || [];
        }

        const key = provider.toLowerCase().trim();
        return _providerModels[key] ? [..._providerModels[key]] : [];
    }

    // ─── Public Interface ────────────────────────────────────────────────

    return {
        /** @type {string} localStorage key for settings persistence. */
        STORAGE_KEY,

        /** @type {Readonly<XzcSettings>} Default settings values. */
        defaults,

        // Core methods
        init,
        get,
        set,
        getAll,

        // Convenience getters
        getApiKey,
        getProvider,
        getModel,
        getSystemPrompt,
        getTemperature,
        getMaxTokens,
        getTheme,

        // Theme
        applyTheme,

        // Modal
        openModal,
        closeModal,

        // Form
        saveFromForm,
        populateForm,
        setupListeners,

        // Provider models
        getModelsForProvider,

        // Expose private methods as public (prefixed) for direct access
        _save,
        _load
    };
})();
