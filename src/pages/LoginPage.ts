import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private get emailInput() { return this.page.locator('#login-email'); }
  private get passwordInput() { return this.page.locator('#login-password'); }
  private get submitButton() { return this.page.locator('#login-submit'); }

  async goto() {
    await super.goto('#practice');
    await this.emailInput.waitFor({ state: 'visible' });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.waitForHash('#dashboard');
  }
}
