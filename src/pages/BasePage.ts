import { Page } from '@playwright/test';
import path from 'path';

export class BasePage {
  constructor(protected page: Page) {}

  async screenshot(name: string) {
    await this.page.screenshot({ path: path.join('test-results', `${name}.png`) });
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }
}
