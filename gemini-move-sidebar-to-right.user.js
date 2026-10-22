// ==UserScript==
// @name         Gemini侧边栏从左侧移动到右侧
// @namespace    http://tampermonkey.net/
// @version      7.01
// @description  利用阿拉伯语的原生 RTL 布局机制将 Gemini 边栏从左侧挪到右侧。
// @author       canghaimansui
// @match        https://gemini.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        /* 1. 将包含侧边栏的外层主容器设为从右向左 (RTL) 排列 */
        bard-sidenav-container,
        side-navigation-v2 {
            direction: rtl !important;
        }

        /* 2. 将侧边栏本身及内部所有内容恢复为正常的从左向右 (LTR) 阅读顺序 */
        bard-sidenav,
        bard-sidenav-content,
        .side-nav-menu-button,
        chat-window,
        .conversation-container,
        .chat-container,
        main {
            direction: ltr !important;
        }

        /* 3. 修正侧边栏边框，使其在右侧时显示在左边缘 */
        bard-sidenav {
            border-left: 1px solid rgba(0, 0, 0, 0.1) !important;
            border-right: none !important;
        }

        /* 4. 修正展开/收起按钮的物理位置 */
        .side-nav-menu-button {
            right: 12px !important;
            left: auto !important;
        }
    `;

    if (typeof GM_addStyle !== 'undefined') {
        GM_addStyle(css);
    } else {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        (document.head || document.documentElement).appendChild(style);
    }
})();
