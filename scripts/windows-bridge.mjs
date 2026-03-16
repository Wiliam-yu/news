// Windows Bridge Service
// 通过 Playwright 控制 Windows Chrome
import { chromium } from 'playwright';

const CDP_URL = 'http://172.31.160.1:9222';

let browser = null;
let context = null;

export async function connect() {
  if (browser) return { browser, context };
  
  browser = await chromium.connectOverCDP(CDP_URL);
  context = browser.contexts()[0];
  console.log('✅ 已连接到 Windows Chrome');
  
  return { browser, context };
}

export async function getPages() {
  const { context } = await connect();
  return context.pages();
}

export async function newPage(url) {
  const { context } = await connect();
  const page = await context.newPage();
  if (url) await page.goto(url);
  return page;
}

export async function screenshot(page, path) {
  await page.screenshot({ path, fullPage: true });
  return path;
}

export async function executeScript(page, script) {
  return await page.evaluate(script);
}

export async function close() {
  if (browser) {
    await browser.close();
    browser = null;
    context = null;
  }
}

// 命令行接口
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2] || 'status';
  
  if (command === 'status') {
    const pages = await getPages();
    console.log('Windows Chrome 状态:');
    console.log('打开的页面数:', pages.length);
    for (const page of pages) {
      console.log(`  - ${await page.title()}: ${page.url()}`);
    }
  } else if (command === 'open') {
    const url = process.argv[3] || 'https://www.baidu.com';
    const page = await newPage(url);
    console.log('已打开:', await page.title());
  } else if (command === 'screenshot') {
    const pages = await getPages();
    const page = pages[0];
    const path = await screenshot(page, '/tmp/screenshot.png');
    console.log('截图保存到:', path);
  }
  
  await close();
}
