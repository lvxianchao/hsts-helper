// i18n.js - Automatic language detection for HSTS Helper
document.addEventListener('DOMContentLoaded', function() {
  // Map browser language codes to our supported locales
  const languageMap = {
    'en': 'en',        // English
    'zh': 'zh_CN',    // Chinese
    'zh-cn': 'zh_CN', // Chinese (China)
    'zh-tw': 'zh_CN', // Chinese (Taiwan) - Fallback to zh_CN
    'es': 'es',       // Spanish
    'ja': 'ja',       // Japanese
    'ko': 'ko',       // Korean
    // Add more mappings as needed
  };


  // Get browser language and normalize it (e.g., 'en-US' -> 'en')
  function getBrowserLanguage() {
    // Try to get from Chrome's i18n API first
    const chromeLang = chrome.i18n.getUILanguage();
    if (chromeLang) {
      const langCode = chromeLang.toLowerCase().split('-')[0];
      return languageMap[langCode] || 'en';
    }
    
    // Fallback to navigator.language
    const navLang = navigator.language || navigator.userLanguage || 'en';
    const langCode = navLang.toLowerCase().split('-')[0];
    return languageMap[langCode] || 'en';
  }

  // Update page content with translations
  function updateContent() {
    // Get all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        const message = chrome.i18n.getMessage(key);
        if (message) {
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = message;
          } else {
            element.textContent = message;
          }
        }
      }
    });
    
    // Update page title
    document.title = chrome.i18n.getMessage('ext_name') || 'HSTS Helper';
  }

  // Set the document language attribute
  document.documentElement.lang = getBrowserLanguage();
  
  // Update content when translations are ready
  if (chrome.i18n) {
    updateContent();
  } else {
    // Fallback in case i18n isn't immediately available
    document.addEventListener('i18n:ready', updateContent);
  }

  // Expose for popup.js
  window.i18n = {
    getMessage: (key) => chrome.i18n.getMessage(key)
  };
});
