import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  private get myProfileButton() { return this.page.locator('button').filter({ hasText: /My Profile/ }); }
  private get editProfileButton() { return this.page.locator('button').filter({ hasText: /Edit Profile/ }); }
  private get profilePictureInput() { return this.page.locator('#profilePicture'); }
  private get saveChangesButton() { return this.page.locator('button').filter({ hasText: /Save Changes/ }); }

  async assertLoggedIn() {
    await this.assertMenuVisible();
  }

  async goToMyProfile() {
    await this.menuButton.click();
    await this.myProfileButton.click();
    await this.waitForHash('#profile');
  }

  async clickEditProfile() {
    await this.editProfileButton.click();
    await this.profilePictureInput.waitFor({ state: 'attached' });
  }

  async uploadProfilePicture(filePath: string) {
    await this.profilePictureInput.setInputFiles(filePath);
  }

  async saveProfile() {
    await this.saveChangesButton.click();
    await this.waitForSave();
  }

  async assertProfileUpdated() {
    await expect(this.editProfileButton).toBeVisible({ timeout: 10000 });
  }
}
