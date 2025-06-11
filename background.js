// 监听网络请求错误
class HSTSErrorDetector {
    constructor() {
        this.errorCount = new Map(); // 存储域名的错误计数
        this.notificationId = null; // 存储通知ID，防止重复通知
    }

    // 检查是否是HSTS相关错误
    isHSTSError(error) {
        // HSTS相关错误通常包含以下关键词
        const hstsErrorKeywords = [
            'ERR_SSL_PROTOCOL_ERROR',
            'ERR_SSL_VERSION_OR_CIPHER_MISMATCH',
            'ERR_SSL_PINNED_KEY_NOT_IN_CERT_CHAIN',
            'ERR_SSL_CLIENT_AUTH_CERT_NEEDED',
            'ERR_SSL_CLIENT_AUTH_PRIVATE_KEY_ACCESS_DENIED'
        ];
        
        return hstsErrorKeywords.some(keyword => error.includes(keyword));
    }

    // 处理错误
    handleError(tabId, url, error) {
        try {
            const hostname = new URL(url).hostname;
            
            // 增加错误计数
            if (!this.errorCount.has(hostname)) {
                this.errorCount.set(hostname, 1);
            } else {
                const count = this.errorCount.get(hostname);
                this.errorCount.set(hostname, count + 1);
            }

            // 如果错误计数达到阈值（例如3次），发送通知
            if (this.errorCount.get(hostname) >= 3) {
                this.showErrorNotification(hostname);
            }
        } catch (e) {
            console.error('Error processing error:', e);
        }
    }

    // 显示错误通知并自动打开popup
    showErrorNotification(hostname) {
        // 创建通知
        const notificationOptions = {
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'HSTS 清理助手',
            message: `检测到 ${hostname} 的 HTTPS 连接问题，可能需要清理 HSTS 缓存。`,
            buttons: [{ title: '清理 HSTS' }]
        };

        chrome.notifications.create(notificationOptions, (id) => {
            this.notificationId = id;
        });

        // 自动打开popup
        chrome.action.openPopup();
    }
}

// 创建错误检测器实例
const errorDetector = new HSTSErrorDetector();

// 处理通知点击事件
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (buttonIndex === 0) {
        // 用户点击了"清理 HSTS"按钮
        chrome.tabs.create({ url: 'chrome://net-internals/#hsts' });
    }
});
