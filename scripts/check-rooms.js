const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://172.31.160.1:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  
  const ctripPage = pages.find(p => p.url().includes('ctrip.com'));
  if (ctripPage) {
    // 获取页面所有文本内容
    const text = await ctripPage.evaluate(() => document.body.innerText);
    console.log('页面关键内容:');
    console.log(text);
  }
  
  await browser.close();
})();
