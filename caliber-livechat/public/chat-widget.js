/**
 * Caliber Shoes - Chat Widget Integration
 * Add this script to your main website to embed the chat system
 */

(function() {
    'use strict';

    // Configuration
    const CHAT_CONFIG = {
        // Replace with your deployed Firebase hosting URL
        chatUrl: 'https://your-project.firebaseapp.com/chat',
        adminUrl: 'https://your-project.firebaseapp.com/admin',

        // Widget position and styling
        position: 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
        buttonText: '💬 Chat with Us',
        buttonColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        buttonSize: 'normal', // 'small', 'normal', 'large'

        // Auto-show options
        autoShow: false, // Show chat automatically after delay
        autoShowDelay: 30000, // 30 seconds

        // Mobile options
        mobileBreakpoint: 768,
        mobilePosition: 'bottom-right'
    };

    // Create chat widget elements
    function createChatWidget() {
        // Main chat button
        const chatButton = document.createElement('div');
        chatButton.id = 'caliber-chat-button';
        chatButton.innerHTML = `
            <button id="caliber-chat-trigger">
                ${CHAT_CONFIG.buttonText}
            </button>
        `;

        // Chat iframe (hidden by default)
        const chatFrame = document.createElement('div');
        chatFrame.id = 'caliber-chat-frame';
        chatFrame.innerHTML = `
            <div id="caliber-chat-container">
                <div id="caliber-chat-header">
                    <h3>🛍️ Caliber Support</h3>
                    <button id="caliber-chat-close">&times;</button>
                </div>
                <iframe id="caliber-chat-iframe" src="${CHAT_CONFIG.chatUrl}" frameborder="0"></iframe>
            </div>
        `;

        // Apply styles
        applyWidgetStyles();

        // Add to page
        document.body.appendChild(chatButton);
        document.body.appendChild(chatFrame);

        // Bind events
        bindChatEvents();

        return { chatButton, chatFrame };
    }

    // Apply CSS styles for the widget
    function applyWidgetStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #caliber-chat-button {
                position: fixed;
                z-index: 1000;
                ${getPositionStyles(CHAT_CONFIG.position)}
            }

            #caliber-chat-trigger {
                background: ${CHAT_CONFIG.buttonColor};
                color: white;
                border: none;
                border-radius: 50px;
                padding: ${getButtonPadding(CHAT_CONFIG.buttonSize)};
                font-size: ${getButtonFontSize(CHAT_CONFIG.buttonSize)};
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transition: all 0.3s ease;
                animation: pulse 2s infinite;
            }

            #caliber-chat-trigger:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
            }

            #caliber-chat-frame {
                position: fixed;
                z-index: 1001;
                ${getPositionStyles(CHAT_CONFIG.position)};
                width: 380px;
                height: 600px;
                max-width: 90vw;
                max-height: 80vh;
                display: none;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                background: white;
            }

            #caliber-chat-container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            #caliber-chat-header {
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                color: white;
                padding: 15px 20px;
                display: flex;
                justify-content: between;
                align-items: center;
                font-size: 16px;
                font-weight: 600;
            }

            #caliber-chat-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s ease;
            }

            #caliber-chat-close:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            #caliber-chat-iframe {
                flex: 1;
                width: 100%;
                border: none;
            }

            @keyframes pulse {
                0% { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
                50% { box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
                100% { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
            }

            @media (max-width: ${CHAT_CONFIG.mobileBreakpoint}px) {
                #caliber-chat-frame {
                    ${getPositionStyles(CHAT_CONFIG.mobilePosition)}
                    width: 100vw;
                    height: 100vh;
                    max-width: 100vw;
                    max-height: 100vh;
                    border-radius: 0;
                }
            }
        `;

        document.head.appendChild(style);
    }

    // Get position styles based on configuration
    function getPositionStyles(position) {
        const positions = {
            'bottom-right': 'bottom: 20px; right: 20px;',
            'bottom-left': 'bottom: 20px; left: 20px;',
            'top-right': 'top: 20px; right: 20px;',
            'top-left': 'top: 20px; left: 20px;'
        };
        return positions[position] || positions['bottom-right'];
    }

    // Get button padding based on size
    function getButtonPadding(size) {
        const sizes = {
            'small': '10px 16px;',
            'normal': '15px 20px;',
            'large': '18px 24px;'
        };
        return sizes[size] || sizes['normal'];
    }

    // Get button font size based on size
    function getButtonFontSize(size) {
        const sizes = {
            'small': '12px;',
            'normal': '14px;',
            'large': '16px;'
        };
        return sizes[size] || sizes['normal'];
    }

    // Bind chat widget events
    function bindChatEvents() {
        const chatButton = document.getElementById('caliber-chat-trigger');
        const chatFrame = document.getElementById('caliber-chat-frame');
        const closeButton = document.getElementById('caliber-chat-close');

        // Open chat
        chatButton.addEventListener('click', function() {
            chatFrame.style.display = 'block';
            chatButton.style.display = 'none';

            // Track chat opening (optional analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'chat_opened', {
                    'event_category': 'engagement',
                    'event_label': 'chat_widget'
                });
            }
        });

        // Close chat
        closeButton.addEventListener('click', function() {
            chatFrame.style.display = 'none';
            chatButton.style.display = 'block';
        });

        // Close on outside click
        chatFrame.addEventListener('click', function(e) {
            if (e.target === chatFrame) {
                chatFrame.style.display = 'none';
                chatButton.style.display = 'block';
            }
        });

        // Auto-show after delay (if enabled)
        if (CHAT_CONFIG.autoShow) {
            setTimeout(() => {
                if (chatFrame.style.display === 'none') {
                    chatButton.click();
                }
            }, CHAT_CONFIG.autoShowDelay);
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // ESC to close chat
            if (e.key === 'Escape' && chatFrame.style.display === 'block') {
                closeButton.click();
            }
        });
    }

    // Initialize widget when DOM is ready
    function initWidget() {
        // Check if widget already exists
        if (document.getElementById('caliber-chat-button')) {
            return;
        }

        // Create and append widget
        createChatWidget();

        console.log('🛍️ Caliber Shoes Chat Widget loaded successfully!');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }

    // Expose configuration for external customization
    window.CaliberChatConfig = CHAT_CONFIG;

})();

// Additional utility functions for external use
window.CaliberChat = {
    // Programmatically open chat
    open: function() {
        const chatButton = document.getElementById('caliber-chat-trigger');
        if (chatButton) chatButton.click();
    },

    // Programmatically close chat
    close: function() {
        const closeButton = document.getElementById('caliber-chat-close');
        if (closeButton) closeButton.click();
    },

    // Update configuration
    config: function(newConfig) {
        Object.assign(CHAT_CONFIG, newConfig);
        // Reinitialize widget with new config
        const existingButton = document.getElementById('caliber-chat-button');
        if (existingButton) {
            existingButton.remove();
        }
        const existingFrame = document.getElementById('caliber-chat-frame');
        if (existingFrame) {
            existingFrame.remove();
        }
        initWidget();
    }
};
