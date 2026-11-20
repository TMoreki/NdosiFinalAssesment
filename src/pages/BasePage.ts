import { Page, expect } from '@playwright/test';
import path from 'path';
import { TestData } from '../data/Testdata';

export class BasePage {
  constructor(protected page: Page) {}

  protected get menuButton() {
    return this.page.locator('button.user-pill');
  }

  async goto(hash: string = '#practice') {
    await this.page.goto(`${TestData.baseUrl}/${hash}`, { waitUntil: 'networkidle' });
  }

  async waitForHash(hash: string, timeout = 30000) {
    await this.page.waitForFunction(
      (h) => window.location.hash === h,
      hash,
      { timeout }
    );
  }

  async waitForSave(ms = 3000) {
    await this.page.waitForTimeout(ms);
  }

  async screenshot(name: string) {
    await this.page.screenshot({ path: path.join('test-results', `${name}.png`) });
  }

  async assertMenuVisible() {
    await expect(this.menuButton).toContainText('Menu▼', { timeout: 15000 });
  }
}
