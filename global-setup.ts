import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://automationintesting.online/admin');
  await page.fill('#username', 'admin');
  await page.fill('#password', 'password');
  await page.click("button[type='submit']");

  await page.waitForURL('**/admin', { timeout: 5000 });

  await context.storageState({ path: 'storageState.json' });
  console.log('✅ storageState נשמר');

  await browser.close();
}

export default globalSetup;
