const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://172.31.160.1:9222');
  const context = browser.contexts()[0];
  
  // 打开新页面访问本地网站
  const page = await context.newPage();
  await page.goto('http://172.31.160.1:3000');
  
  console.log('已打开网站');
  await browser.close();
})();
