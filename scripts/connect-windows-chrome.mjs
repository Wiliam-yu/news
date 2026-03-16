// Playwright 连接 Windows Chrome (通过 CDP)
import { chromium } from 'playwright';

async function connectToWindowsChrome() {
  // Windows Chrome 的 CDP 地址 (Windows IP: 172.31.160.1)
  const cdpUrl = 'http://172.31.160.1:9222';
  
  const browser = await chromium.connectOverCDP(cdpUrl);
  const context = browser.contexts()[0];
  const page = context.pages()[0] || await context.newPage();
  
  console.log('✅ 已连接到 Windows Chrome');
  console.log('页面标题:', await page.title());
  
  return { browser, page };
}

// 单独连接用的
export async function getWindowsChromePage() {
  const { browser, page } = await connectToWindowsChrome();
  return { browser, page };
}

// 如果直接运行
if (import.meta.url === `file://${process.argv[1]}`) {
  connectToWindowsChrome()
    .then(({ browser, page }) => {
      console.log('🎉 连接成功！');
      // 保持连接，不关闭
    })
    .catch(console.error);
}
