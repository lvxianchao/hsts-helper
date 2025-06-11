document.addEventListener('DOMContentLoaded', function() {
  // Get current active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs || tabs.length === 0) return;
    
    const url = new URL(tabs[0].url);
    const domain = url.hostname;
    
    // 复制域名按钮
    document.getElementById('copy-domain').addEventListener('click', async function() {
      try {
        await navigator.clipboard.writeText(domain);
        alert((window.i18n?.getMessage('copied_alert') || 'Domain copied:') + ' ' + domain);
      } catch (err) {
        console.error('Failed to copy domain:', err);
        alert('Failed to copy domain: ' + err.message);
      }
    });
    
    // 打开HSTS设置按钮
    document.getElementById('go-hsts').addEventListener('click', function() {
      chrome.tabs.create({ url: 'chrome://net-internals/#hsts' });
    });
  });
});