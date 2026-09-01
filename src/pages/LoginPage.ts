import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async goto() {
    await this.page.goto('https://ndosisimplifiedautomation.vercel.app/#practice', { waitUntil: 'networkidle' });
    await this.page.waitForSelector('#login-email', { state: 'visible' });
  }

  async login(email: string, password: string) {
    await this.page.fill('#login-email', email);
    await this.page.fill('#login-password', password);
    await this.page.click('#login-submit');
    await this.page.waitForFunction(() => window.location.hash === '#dashboard', { timeout: 30000 });
  }
}
