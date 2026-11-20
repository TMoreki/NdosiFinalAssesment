import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  async assertDashboardLoaded() {
    await this.page.waitForFunction(() => window.location.hash === '#dashboard', { timeout: 30000 });
    await expect(this.page.locator('button.user-pill')).toBeVisible({ timeout: 10000 });
  }

  async assertWelcomeVisible() {
    await expect(this.page.locator('button.user-pill')).toContainText('Menu▼', { timeout: 15000 });
  }
}
