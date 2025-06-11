<div align="center">

[English](README.md) | [中文](README.zh-CN.md)

</div>

# HSTS 清理助手

该 Chrome 插件用于帮助用户快速解决由于 Cloudflare 强制 HSTS 导致的 HTTPS 报错问题。

## 功能

- 自动提取当前访问的域名并复制
- 一键跳转到 Chrome 的 HSTS 清理页面（chrome://net-internals/#hsts）
- 提供图文提示帮助用户手动清除缓存

## 使用场景

适用于关闭 Cloudflare 代理或 SSL 后浏览器仍强制访问 HTTPS 的情况，解决 `NET::ERR_CERT_COMMON_NAME_INVALID` 报错。

## 安装方式

1. 下载 zip 文件并解压
2. 打开 Chrome 扩展管理页：`chrome://extensions`
3. 开启右上角"开发者模式"
4. 点击"加载已解压的扩展程序"，选择解压目录即可

## 隐私说明

本插件不会收集或上传任何用户数据，所有操作均在本地浏览器中完成。

## 许可证

MIT

---

<div align="center">

[English](README.md) | [中文](README.zh-CN.md)

</div>
