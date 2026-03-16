const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://172.31.160.1:9222');
  const context = browser.contexts()[0];
  
  // 获取所有页面
  const pages = context.pages();
  console.log('打开的页面数:', pages.length);
  
  // 如果有页面，打印标题
  for (const page of pages) {
    console.log('页面标题:', await page.title());
    console.log('页面URL:', page.url());
  }
  
  // 打开新页面测试
  const newPage = await context.newPage();
  await newPage.goto('https://www.baidu.com');
  console.log('新页面标题:', await newPage.title());
  
  await browser.close();
  console.log('✅ 测试完成');
})();
