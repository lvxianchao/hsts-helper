document.addEventListener('DOMContentLoaded', () => {
  // 复制域名按钮
  document.getElementById("copy-domain").addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) return;
      
      const url = new URL(tab.url);
      await navigator.clipboard.writeText(url.hostname);
      alert(`Domain copied: ${url.hostname}`);
    } catch (error) {
      console.error('Error copying domain:', error);
    }
  });

  // 打开HSTS设置按钮
  document.getElementById("go-hsts").addEventListener("click", () => {
    chrome.tabs.create({ url: "chrome://net-internals/#hsts" });
  });
});