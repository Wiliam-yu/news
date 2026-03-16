const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://172.31.160.1:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  
  // 找 hikvision 页面
  const hkPage = pages.find(p => p.url().includes('hikvision.com'));
  if (hkPage) {
    console.log('URL:', hkPage.url());
    console.log('Title:', await hkPage.title());
    console.log('--- Content ---');
    const text = await hkPage.evaluate(() => document.body.innerText);
    console.log(text.substring(0, 5000));
  } else {
    console.log('未找到 hikvision 页面');
  }
  
  await browser.close();
})();
