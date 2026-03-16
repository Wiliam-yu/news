const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://172.31.160.1:9222');
  const context = browser.contexts()[0];
  
  // 刷新现有页面
  const pages = context.pages();
  for (const page of pages) {
    if (page.url().includes('127.0.0.1:3000')) {
      await page.reload();
    }
  }
  
  console.log('已刷新页面');
  await browser.close();
})();
