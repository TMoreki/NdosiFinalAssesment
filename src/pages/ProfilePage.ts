import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  async assertLoggedIn() {
    await expect(this.page.locator('button.user-pill')).toContainText('Menu▼');
  }

  async goToMyProfile() {
    await this.page.locator('button.user-pill').click();
    await this.page.locator('button').filter({ hasText: /My Profile/ }).click();
    await this.page.waitForFunction(() => window.location.hash === '#profile', { timeout: 10000 });
  }

  async clickEditProfile() {
    await this.page.locator('button').filter({ hasText: /Edit Profile/ }).click();
    await this.page.waitForSelector('#profilePicture', { state: 'attached' });
  }

  async uploadProfilePicture(filePath: string) {
    await this.page.locator('#profilePicture').setInputFiles(filePath);
  }

  async saveProfile() {
    await this.page.locator('button').filter({ hasText: /Save Changes/ }).click();
  }

  async assertProfileUpdated() {
    await expect(this.page.locator('button').filter({ hasText: /Edit Profile/ })).toBeVisible({ timeout: 10000 });
  }
}
