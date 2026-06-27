/**
 * Application shell for xzc.ai.
 * Wires global UI controls, model selection, settings actions, and dialogs.
 */
window.XzcApp = (() => {
    'use strict';

    const SIDEBAR_COLLAPSED_KEY = 'xzc_ai_sidebar_collapsed';

    let modelDropdownOpen = false;
    const els = {};

    function init() {
        queryElements();
        Settings.init();
        ChatController.init();
        restoreSidebarState();
        bindShellEvents();
        renderModelDropdown();
        updateCurrentModelName();
    }

    function queryElements() {
        els.body = document.body;
        els.newChatBtn = document.getElementById('new-chat-btn');
        els.settingsBtn = document.getElementById('settings-btn');
        els.exportBtn = document.getElementById('export-btn');
        els.sidebarCollapseBtn = document.getElementById('sidebar-collapse-btn');
        els.sidebarOpenBtn = document.getElementById('sidebar-open-btn');
        els.sidebarOverlay = document.getElementById('sidebar-overlay');
        els.modelSelectorBtn = document.getElementById('model-selector-btn');
        els.modelDropdown = document.getElementById('model-dropdown');
        els.currentModelName = document.getElementById('current-model-name');
        els.importBtn = document.getElementById('import-btn');
        els.importInput = document.getElementById('import-file-input');
        els.exportAllBtn = document.getElementById('export-all-btn');
        els.clearAllBtn = document.getElementById('clear-all-btn');
        els.toggleKeyBtn = document.getElementById('toggle-key-visibility');
        els.apiKeyInput = document.getElementById('api-key-input');
        els.confirmDialog = document.getElementById('confirm-dialog');
        els.confirmTitle = document.getElementById('confirm-title');
        els.confirmMessage = document.getElementById('confirm-message');
        els.confirmCancelBtn = document.getElementById('confirm-cancel-btn');
        els.confirmOkBtn = document.getElementById('confirm-ok-btn');
        els.confirmOverlay = document.getElementById('confirm-overlay');
    }

    function bindShellEvents() {
        if (els.newChatBtn) {
            els.newChatBtn.addEventListener('click', () => {
                ChatController.newChat(true);
                closeMobileSidebar();
            });
        }

        if (els.settingsBtn) {
            els.settingsBtn.addEventListener('click', () => Settings.openModal());
        }

        if (els.exportBtn) {
            els.exportBtn.addEventListener('click', () => ChatController.exportCurrentOrAll());
        }

        if (els.sidebarCollapseBtn) {
            els.sidebarCollapseBtn.addEventListener('click', toggleSidebarCollapsed);
        }

        if (els.sidebarOpenBtn) {
            els.sidebarOpenBtn.addEventListener('click', openSidebar);
        }

        if (els.sidebarOverlay) {
            els.sidebarOverlay.addEventListener('click', closeMobileSidebar);
        }

        if (els.modelSelectorBtn) {
            els.modelSelectorBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                toggleModelDropdown();
            });
        }

        document.addEventListener('click', (event) => {
            if (!modelDropdownOpen) {
                return;
            }

            const clickedDropdown = els.modelDropdown && els.modelDropdown.contains(event.target);
            const clickedButton = els.modelSelectorBtn && els.modelSelectorBtn.contains(event.target);
            if (!clickedDropdown && !clickedButton) {
                closeModelDropdown();
            }
        });

        document.addEventListener('keydown', handleKeyboardShortcuts);
        window.addEventListener('resize', positionModelDropdown);
        window.addEventListener('xzc:settingschange', () => {
            renderModelDropdown();
            updateCurrentModelName();
        });

        bindDataActions();
        bindKeyVisibility();
    }

    function bindDataActions() {
        if (els.exportAllBtn) {
            els.exportAllBtn.addEventListener('click', () => {
                const data = ChatHistory.exportAll();
                downloadText(`xzc-ai-chats-${new Date().toISOString().slice(0, 10)}.json`, data, 'application/json');
                Utils.showToast('All chats exported.', 'success');
            });
        }

        if (els.importBtn && els.importInput) {
            els.importBtn.addEventListener('click', () => els.importInput.click());
            els.importInput.addEventListener('change', async () => {
                const file = els.importInput.files && els.importInput.files[0];
                if (!file) {
                    return;
                }

                try {
                    const text = await file.text();
                    const count = ChatHistory.importChats(text);
                    ChatController.renderHistory();
                    const firstChat = ChatHistory.getAll()[0];
                    if (firstChat) {
                        ChatController.loadChat(firstChat.id);
                    }
                    Utils.showToast(count > 0 ? `Imported ${count} chat(s).` : 'No valid chats found in that file.', count > 0 ? 'success' : 'warning');
                } catch (error) {
                    Utils.showToast(error.message || 'Import failed.', 'error');
                } finally {
                    els.importInput.value = '';
                }
            });
        }

        if (els.clearAllBtn) {
            els.clearAllBtn.addEventListener('click', async () => {
                const ok = await confirm(
                    'Clear all chats',
                    'Delete every saved chat from this browser? This cannot be undone.'
                );

                if (!ok) {
                    return;
                }

                ChatHistory.clearAll();
                ChatController.newChat(false);
                Utils.showToast('All chats cleared.', 'success');
            });
        }
    }

    function bindKeyVisibility() {
        if (!els.toggleKeyBtn || !els.apiKeyInput) {
            return;
        }

        els.toggleKeyBtn.addEventListener('click', () => {
            const isPassword = els.apiKeyInput.type === 'password';
            els.apiKeyInput.type = isPassword ? 'text' : 'password';
            els.toggleKeyBtn.classList.toggle('active', isPassword);
            els.toggleKeyBtn.title = isPassword ? 'Hide API key' : 'Show API key';
        });
    }

    function handleKeyboardShortcuts(event) {
        const modifier = event.ctrlKey || event.metaKey;
        if (event.key === 'Escape') {
            closeModelDropdown();
            closeMobileSidebar();
            Settings.closeModal();
            return;
        }

        if (!modifier) {
            return;
        }

        if (event.key.toLowerCase() === 'n') {
            event.preventDefault();
            ChatController.newChat(true);
        }

        if (event.shiftKey && event.key.toLowerCase() === 's') {
            event.preventDefault();
            toggleSidebarCollapsed();
        }
    }

    function restoreSidebarState() {
        const collapsed = localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true';
        els.body.classList.toggle('sidebar-collapsed', collapsed);
    }

    function toggleSidebarCollapsed() {
        const collapsed = !els.body.classList.contains('sidebar-collapsed');
        els.body.classList.toggle('sidebar-collapsed', collapsed);
        els.body.classList.remove('sidebar-open');
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
    }

    function openSidebar() {
        if (els.body.classList.contains('sidebar-collapsed')) {
            els.body.classList.remove('sidebar-collapsed');
            localStorage.setItem(SIDEBAR_COLLAPSED_KEY, 'false');
            return;
        }

        els.body.classList.add('sidebar-open');
    }

    function closeMobileSidebar() {
        els.body.classList.remove('sidebar-open');
    }

    function getAllModelOptions() {
        return ['openai', 'gemini'].flatMap((provider) => {
            return Settings.getModelsForProvider(provider).map((model) => ({
                ...model,
                provider,
                providerName: XzcAPI.PROVIDER_LABELS[provider] || provider
            }));
        });
    }

    function renderModelDropdown() {
        if (!els.modelDropdown) {
            return;
        }

        const currentProvider = Settings.getProvider();
        const currentModel = Settings.getModel();
        els.modelDropdown.innerHTML = '';

        getAllModelOptions().forEach((model) => {
            const option = document.createElement('button');
            option.type = 'button';
            option.className = 'model-option';
            option.classList.toggle('active', model.provider === currentProvider && model.id === currentModel);
            option.dataset.provider = model.provider;
            option.dataset.model = model.id;
            option.innerHTML = `
                <span class="model-name">${Utils.escapeHtml(model.name)}</span>
                <span class="model-provider">${Utils.escapeHtml(model.providerName)}</span>
            `;
            option.addEventListener('click', () => {
                Settings.set('apiProvider', model.provider);
                Settings.set('model', model.id);
                Settings.populateForm();
                updateCurrentModelName();
                renderModelDropdown();
                closeModelDropdown();
            });
            els.modelDropdown.appendChild(option);
        });
    }

    function updateCurrentModelName() {
        if (!els.currentModelName) {
            return;
        }

        const currentProvider = Settings.getProvider();
        const currentModel = Settings.getModel();
        const selected = getAllModelOptions().find((model) => {
            return model.provider === currentProvider && model.id === currentModel;
        });

        els.currentModelName.textContent = selected ? selected.name : currentModel || 'Select model';
    }

    function toggleModelDropdown() {
        if (modelDropdownOpen) {
            closeModelDropdown();
        } else {
            openModelDropdown();
        }
    }

    function openModelDropdown() {
        if (!els.modelDropdown || !els.modelSelectorBtn) {
            return;
        }

        modelDropdownOpen = true;
        els.modelDropdown.classList.add('open');
        els.modelDropdown.classList.remove('hidden');
        els.modelSelectorBtn.querySelector('.dropdown-arrow')?.classList.add('open');
        positionModelDropdown();
    }

    function closeModelDropdown() {
        if (!els.modelDropdown || !els.modelSelectorBtn) {
            return;
        }

        modelDropdownOpen = false;
        els.modelDropdown.classList.remove('open');
        els.modelDropdown.classList.add('hidden');
        els.modelSelectorBtn.querySelector('.dropdown-arrow')?.classList.remove('open');
    }

    function positionModelDropdown() {
        if (!modelDropdownOpen || !els.modelDropdown || !els.modelSelectorBtn) {
            return;
        }

        const rect = els.modelSelectorBtn.getBoundingClientRect();
        const dropdownWidth = Math.max(280, rect.width);
        const left = Math.min(
            Math.max(12, rect.left + rect.width / 2 - dropdownWidth / 2),
            window.innerWidth - dropdownWidth - 12
        );

        els.modelDropdown.style.width = `${dropdownWidth}px`;
        els.modelDropdown.style.left = `${left}px`;
        els.modelDropdown.style.top = `${rect.bottom + 8}px`;
    }

    function confirm(title, message) {
        if (!els.confirmDialog) {
            return Promise.resolve(window.confirm(message));
        }

        return new Promise((resolve) => {
            els.confirmTitle.textContent = title || 'Confirm';
            els.confirmMessage.textContent = message || 'Are you sure?';
            els.confirmDialog.classList.add('open');

            const cleanup = (value) => {
                els.confirmDialog.classList.remove('open');
                els.confirmCancelBtn.removeEventListener('click', onCancel);
                els.confirmOkBtn.removeEventListener('click', onOk);
                els.confirmOverlay.removeEventListener('click', onCancel);
                resolve(value);
            };

            const onCancel = () => cleanup(false);
            const onOk = () => cleanup(true);

            els.confirmCancelBtn.addEventListener('click', onCancel);
            els.confirmOkBtn.addEventListener('click', onOk);
            els.confirmOverlay.addEventListener('click', onCancel);
        });
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

    document.addEventListener('DOMContentLoaded', init);

    return {
        init,
        confirm,
        renderModelDropdown,
        updateCurrentModelName
    };
})();
