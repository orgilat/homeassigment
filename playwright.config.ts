import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  globalSetup: './global-setup',
  retries: 0,
  use: {
    baseURL: 'https://automationintesting.online',
    storageState: 'storageState.json',
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },
  reporter: [
    ['list'], // Displays test results in the terminal
    ['allure-playwright'], // Most important: enables Allure reports
  ],
});
