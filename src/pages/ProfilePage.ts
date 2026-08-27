import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  async goToMyProfile() {
    await this.navigate('/my_account');
  }

  async clickEditProfile() {
    await this.page.click('a[href="/edit_account"]');
  }

  async uploadProfilePicture(filePath: string) {
    await this.page.locator('input[type="file"]').setInputFiles(filePath);
  }

  async saveProfile() {
    await this.page.click('[data-qa="update-button"]');
  }

  async assertProfileUpdated() {
    await expect(this.page.locator('text=Account Updated!')).toBeVisible();
  }

  async assertLoggedIn() {
    await expect(this.page.locator('text=Logged in as')).toBeVisible();
  }
}
