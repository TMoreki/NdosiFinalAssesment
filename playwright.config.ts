import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  timeout: 180_000,
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
    launchOptions: { slowMo: isCI ? 0 : 1500 },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', ...devices['Desktop Chrome'] },
    },
  ],
});
