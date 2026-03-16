const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://172.31.160.1:9222');
  const context = browser.contexts()[0];
  
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000');
  await page.waitForTimeout(2000);
  
  console.log('网站已打开');
  await browser.close();
})();
