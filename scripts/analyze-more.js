const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://172.31.160.1:9222');
  const context = browser.contexts()[0];
  const page = await context.newPage();
  
  // 获取主要导航链接
  const mainLinks = [];
  
  // Products 子页面
  await page.goto('https://www.hikvision.com/us-en/products/');
  await page.waitForTimeout(2000);
  let links = await page.evaluate(() => 
    Array.from(document.querySelectorAll('a[href]'))
      .map(a => a.href)
      .filter(h => h.includes('/products/') && !h.includes('#'))
  );
  mainLinks.push(...links.slice(0, 20));
  
  // Solutions
  await page.goto('https://www.hikvision.com/us-en/solutions/');
  await page.waitForTimeout(2000);
  links = await page.evaluate(() => 
    Array.from(document.querySelectorAll('a[href]'))
      .map(a => a.href)
      .filter(h => h.includes('/solutions/') && !h.includes('#'))
  );
  mainLinks.push(...links.slice(0, 15));
  
  // Support
  await page.goto('https://www.hikvision.com/us-en/support/');
  await page.waitForTimeout(2000);
  links = await page.evaluate(() => 
    Array.from(document.querySelectorAll('a[href]'))
      .map(a => a.href)
      .filter(h => h.includes('/support/') && !h.includes('#'))
  );
  mainLinks.push(...links.slice(0, 10));
  
  // 登录页面
  console.log('=== 登录页面 ===');
  console.log('https://www.hikvision.com/us-en/login/');
  
  console.log('\n=== 主要产品页面 ===');
  console.log([...new Set(mainLinks)].slice(0, 30).join('\n'));
  
  await browser.close();
})();
