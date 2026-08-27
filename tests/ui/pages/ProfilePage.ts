import { Page, expect } from '@playwright/test';

export class ProfilePage {
  constructor(private page: Page) {}

  async openMenu() {
    // Top nav bar link that opens account/menu area
    await this.page.click('a[href="/login"] >> visible=true');
  }

  async goToMyProfile() {
    await this.page.goto('/my_account');
  }

  async clickEditProfile() {
    await this.page.click('a[href="/edit_account"]');
  }

  async uploadProfilePicture(filePath: string) {
    // Automation Exercise uses a file input for profile picture
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);
  }

  async saveProfile() {
    await this.page.click('[data-qa="update-button"]');
  }

  async assertProfileUpdated() {
    await expect(this.page.locator('text=Account Updated!')).toBeVisible();
  }
}
