import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  async assertDashboardLoaded() {
    await this.waitForHash('#dashboard');
    await expect(this.menuButton).toContainText('Menu▼', { timeout: 15000 });
  }
}
