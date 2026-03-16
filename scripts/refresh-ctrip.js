const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://172.31.160.1:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  
  // 找到携程页面
  const ctripPage = pages.find(p => p.url().includes('ctrip.com'));
  if (ctripPage) {
    await ctripPage.reload();
    await ctripPage.waitForTimeout(2000);
    await ctripPage.screenshot({ path: '/tmp/ctrip-fresh.png', fullPage: true });
    console.log('页面已刷新');
  } else {
    console.log('未找到携程页面');
  }
  
  await browser.close();
})();
