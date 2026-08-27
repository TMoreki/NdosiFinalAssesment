import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async goto() {
    await this.navigate('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('[data-qa="login-email"]', email);
    await this.page.fill('[data-qa="login-password"]', password);
    await this.page.click('[data-qa="login-button"]');
  }
}
