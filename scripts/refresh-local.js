const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://172.31.160.1:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  
  // 刷新本地页面
  for (const page of pages) {
    if (page.url().includes('127.0.0.1:3000') || page.url().includes('172.31')) {
      await page.reload();
      await page.waitForTimeout(2000);
      console.log('已刷新页面:', page.url());
    }
  }
  
  await browser.close();
})();
