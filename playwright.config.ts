import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 1,
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    launchOptions: { slowMo: 1500 },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
