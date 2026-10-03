// ==UserScript==
// @name         GateOverflow Book - Clean Reader
// @namespace    gateoverflow-clean-reader
// @version      1.4
// @description  Clean GateOverflow Book Viewer with inner scrolling, centered content, hidden controls, and safe Light/Dark toggle
// @match        https://gateoverflow.in/book*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    const STYLE_ID = 'go-clean-reader-style';
    const THEME_BUTTON_ID = 'go-theme-toggle';

    // ------------------------------------------------------------
    // CSS
    // ------------------------------------------------------------

    function addStyle() {
        if (document.getElementById(STYLE_ID)) {
            return;
        }

        const style = document.createElement('style');
        style.id = STYLE_ID;

        style.textContent = `
            html,
            body {
                width: 100% !important;
                height: 100% !important;
                min-width: 0 !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                overscroll-behavior: none !important;
            }

            .qa-body-container,
            .qa-body-wrapper,
            .qa-gdev-body,
            .gdev-body-wrapper {
                width: 100% !important;
                height: 100% !important;
                min-width: 0 !important;
                min-height: 0 !important;
                max-width: none !important;
                max-height: none !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                overscroll-behavior: none !important;
                box-sizing: border-box !important;
            }

            main.qa-main {
                position: fixed !important;
                inset: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                min-width: 0 !important;
                min-height: 0 !important;
                max-width: none !important;
                max-height: none !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                overscroll-behavior: none !important;
                box-sizing: border-box !important;
            }

            main.qa-main > .qa-title-section {
                display: none !important;
            }

            main.qa-main > .qa-main-wrapper {
                position: fixed !important;
                inset: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                min-width: 0 !important;
                min-height: 0 !important;
                max-width: none !important;
                max-height: none !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                overscroll-behavior: none !important;
                box-sizing: border-box !important;
            }

            #book-viewer-app {
                position: fixed !important;
                inset: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                min-width: 0 !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                display: flex !important;
                flex-direction: column !important;
                overflow: hidden !important;
                overscroll-behavior: none !important;
                box-sizing: border-box !important;
            }

            #book-viewer-app > .bv-toolbar {
                flex: 0 0 auto !important;
                overflow: hidden !important;
                box-sizing: border-box !important;
            }

            #book-viewer-app > .bv-container {
                flex: 1 1 auto !important;
                min-width: 0 !important;
                min-height: 0 !important;
                width: 100% !important;
                height: auto !important;
                display: flex !important;
                overflow: hidden !important;
                overscroll-behavior: none !important;
                box-sizing: border-box !important;
            }

            #bv-sidebar {
                min-width: 0 !important;
                min-height: 0 !important;
                overflow-x: hidden !important;
                overflow-y: auto !important;
                overscroll-behavior: contain !important;
                box-sizing: border-box !important;
            }

            #bv-content {
                min-width: 0 !important;
                min-height: 0 !important;
                overflow-x: hidden !important;
                overflow-y: auto !important;
                overscroll-behavior: contain !important;
                box-sizing: border-box !important;
            }

            #bv-content-area {
                min-width: 0 !important;
                margin-left: auto !important;
                margin-right: auto !important;
                transform: translateX(-50px) !important;
                box-sizing: border-box !important;
            }

            :fullscreen #bv-content-area {
                transform: none !important;
            }

            /* Hide GateOverflow site chrome */
            header.qa-header,
            .leftPanel,
            .qa-sidepanel,
            .body-header,
            .body-footer,
            footer.qa-footer,
            .qa-footer {
                display: none !important;
            }

            /* Hide selected Book Viewer controls */
            #bv-expand-all,
            #bv-collapse-all,
            #bv-btn-pdf-req,
            #bv-show-notes-btn,
            .bv-btn-pdf-dl,
            .bv-btn-hardcopy,
            .bv-btn-pdf-req {
                display: none !important;
            }

            /* Small Light/Dark button */
            #${THEME_BUTTON_ID} {
                flex: 0 0 auto !important;
                min-width: 58px !important;
                width: auto !important;
                height: 28px !important;
                margin-left: 4px !important;
                padding: 2px 8px !important;
                border: 1px solid rgba(127, 127, 127, 0.45) !important;
                border-radius: 4px !important;
                background: transparent !important;
                color: inherit !important;
                font: inherit !important;
                font-size: 12px !important;
                line-height: 1 !important;
                cursor: pointer !important;
                white-space: nowrap !important;
                box-sizing: border-box !important;
            }

            #${THEME_BUTTON_ID}:hover {
                background: rgba(127, 127, 127, 0.12) !important;
            }

            #${THEME_BUTTON_ID}:active {
                transform: scale(0.97);
            }
        `;

        document.head.appendChild(style);
    }

    // ------------------------------------------------------------
    // HIDE EVERYTHING EXCEPT BOOK VIEWER
    // ------------------------------------------------------------

    function hideOutsideMain() {
        const main = document.querySelector('main.qa-main');
        if (!main) return false;

        const wrapper = main.querySelector(':scope > .qa-main-wrapper');
        if (!wrapper) return false;

        let current = main;

        while (current && current.parentElement) {
            const parent = current.parentElement;

            [...parent.children].forEach(child => {
                if (child !== current) {
                    child.style.setProperty(
                        'display',
                        'none',
                        'important'
                    );
                }
            });

            if (parent === document.body) {
                break;
            }

            current = parent;
        }

        [...document.body.children].forEach(child => {
            if (!child.contains(main)) {
                child.style.setProperty(
                    'display',
                    'none',
                    'important'
                );
            }
        });

        [...main.children].forEach(child => {
            if (child !== wrapper) {
                child.style.setProperty(
                    'display',
                    'none',
                    'important'
                );
            }
        });

        wrapper.style.setProperty(
            'display',
            'block',
            'important'
        );

        return true;
    }

    function resetPageScroll() {
        document.documentElement.scrollTop = 0;
        document.documentElement.scrollLeft = 0;
        document.body.scrollTop = 0;
        document.body.scrollLeft = 0;
        window.scrollTo(0, 0);
    }

    // ------------------------------------------------------------
    // THEME
    // ------------------------------------------------------------

    function getTheme() {
        return localStorage.getItem('theme') === 'dark'
            ? 'dark'
            : 'light';
    }

    function updateThemeButton() {
        const button = document.getElementById(THEME_BUTTON_ID);
        if (!button) return;

        const dark = getTheme() === 'dark';

        const newText = dark ? '☀ Light' : '☾ Dark';
        const newTitle = dark
            ? 'Switch to light mode'
            : 'Switch to dark mode';

        // IMPORTANT:
        // Only modify the button if something actually changed.
        // This prevents MutationObserver loops.
        if (button.textContent !== newText) {
            button.textContent = newText;
        }

        if (button.title !== newTitle) {
            button.title = newTitle;
        }

        if (button.getAttribute('aria-label') !== newTitle) {
            button.setAttribute('aria-label', newTitle);
        }
    }

    function setTheme(theme) {
        const dark = theme === 'dark';

        // GateOverflow's actual persistent theme setting.
        localStorage.setItem(
            'theme',
            dark ? 'dark' : 'light'
        );

        // GateOverflow's actual CSS theme selector.
        document.documentElement.setAttribute(
            'data-theme',
            dark ? 'dark' : 'light'
        );

        // Update mobile browser address-bar color.
        const meta = document.getElementById('mobile-theme-color');

        if (meta) {
            meta.setAttribute(
                'content',
                dark ? '#1b1c1e' : '#ffffff'
            );
        }

        // Synchronize the hidden native toggle without displaying it.
        document.querySelectorAll('.toggle-dark-mode').forEach(toggle => {
            toggle.classList.toggle('toggle-active', dark);
        });

        updateThemeButton();
    }

    function addThemeToggle() {
        const toolbar =
            document.querySelector('#book-viewer-app > .bv-toolbar');

        if (!toolbar) return;

        let button = document.getElementById(THEME_BUTTON_ID);

        if (!button) {
            button = document.createElement('button');

            button.id = THEME_BUTTON_ID;
            button.type = 'button';

            button.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                const current = getTheme();

                setTheme(
                    current === 'dark'
                        ? 'light'
                        : 'dark'
                );
            });

            toolbar.appendChild(button);
        }

        updateThemeButton();
    }

    // ------------------------------------------------------------
    // INITIAL SETUP
    // ------------------------------------------------------------

    function apply() {
        addStyle();

        if (hideOutsideMain()) {
            resetPageScroll();
        }

        addThemeToggle();
    }

    apply();

    // ------------------------------------------------------------
    // LIMITED OBSERVER
    //
    // Only use the observer to detect the Book Viewer being created.
    // We do NOT change theme state or button text from every mutation.
    // ------------------------------------------------------------

    let observerTimer = null;

    const observer = new MutationObserver(() => {
        if (observerTimer !== null) {
            return;
        }

        observerTimer = requestAnimationFrame(() => {
            observerTimer = null;

            addStyle();
            hideOutsideMain();
            addThemeToggle();
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // ------------------------------------------------------------
    // IF THE SITE CHANGES THE THEME ITSELF
    // ------------------------------------------------------------

    window.addEventListener('storage', function (event) {
        if (event.key !== 'theme') {
            return;
        }

        const theme =
            event.newValue === 'dark'
                ? 'dark'
                : 'light';

        document.documentElement.setAttribute(
            'data-theme',
            theme
        );

        updateThemeButton();
    });
})();
