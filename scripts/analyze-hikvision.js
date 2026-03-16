const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://172.31.160.1:9222');
  const context = browser.contexts()[0];
  
  // 在新标签打开 hikvision.com
  const page = await context.newPage();
  await page.goto('https://www.hikvision.com/us-en/');
  await page.waitForTimeout(3000);
  
  // 获取所有链接
  const links = await page.evaluate(() => {
    const allLinks = Array.from(document.querySelectorAll('a[href]'));
    const uniqueLinks = [...new Set(allLinks.map(a => a.href))];
    return uniqueLinks.filter(href => 
      href.includes('hikvision.com') && 
      !href.includes('#') &&
      !href.includes('javascript')
    ).slice(0, 50);
  });
  
  console.log('=== 页面链接 ===');
  links.forEach((link, i) => console.log(`${i+1}. ${link}`));
  
  await browser.close();
})();
