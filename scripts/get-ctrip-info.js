const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://172.31.160.1:9222');
  const context = browser.contexts()[0];
  const pages = context.pages();
  
  const ctripPage = pages.find(p => p.url().includes('ctrip.com'));
  if (ctripPage) {
    // 获取页面标题和URL
    console.log('URL:', ctripPage.url());
    console.log('标题:', await ctripPage.title());
    
    // 尝试获取房型信息
    const roomInfo = await ctripPage.evaluate(() => {
      const rooms = [];
      // 查找所有房型元素
      const roomElements = document.querySelectorAll('.hotel-room-item, .room-item, [class*="room"]');
      roomElements.forEach(el => {
        const name = el.querySelector('.room-name, .hotel-name, [class*="name"]')?.innerText;
        const price = el.querySelector('.price, [class*="price"]')?.innerText;
        const status = el.innerText;
        if (name) rooms.push({ name, price, status: status.substring(0, 100) });
      });
      return rooms;
    });
    
    console.log('房型信息:', JSON.stringify(roomInfo, null, 2));
  }
  
  await browser.close();
})();
