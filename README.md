<div align="right" style="margin-bottom: 1em;">
  <a href="README.md">English</a> | 
  <a href="README.zh-CN.md">中文</a>
</div>

<div align="center">
  <h1>HSTS Helper</h1>
  <p>A Chrome extension that helps users quickly resolve HTTPS errors caused by Cloudflare's forced HSTS.</p>
  
  <div>
    <a href="https://github.com/lvxianchao/hsts-helper">
      <img src="https://img.shields.io/badge/View%20on-GitHub-blue?style=for-the-badge&logo=github" alt="View on GitHub">
    </a>
  </div>
</div>

## Features

- Automatically extracts and copies the current domain
- One-click access to Chrome's HSTS settings (chrome://net-internals/#hsts)
- Provides visual guidance for manually clearing HSTS cache

## Use Case

Resolves `NET::ERR_CERT_COMMON_NAME_INVALID` errors that occur when browsers still force HTTPS after disabling Cloudflare proxy or SSL.

## Installation

1. Download and extract the ZIP file
2. Open Chrome Extensions page: `chrome://extensions`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the extracted folder

## Privacy

This extension does not collect or upload any user data. All operations are performed locally in your browser.

## License

MIT © [lvxianchao](https://github.com/lvxianchao)
