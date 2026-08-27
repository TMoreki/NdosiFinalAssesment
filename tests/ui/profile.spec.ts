import { test, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';

const EMAIL = process.env.USER_EMAIL!;
const PASSWORD = process.env.USER_PASSWORD!;
const AVATAR = path.resolve(__dirname, '../../fixtures/avatar.png');

test.describe('Profile Picture Update', () => {
  test('should login, navigate to profile and upload a new profile picture', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);

    // Step 1: Login
    await loginPage.goto();
    await page.screenshot({ path: 'test-results/01-login-page.png' });
    await loginPage.login(EMAIL, PASSWORD);

    // Step 2: Verify logged in
    await expect(page.locator(`text=Logged in as`)).toBeVisible();
    await page.screenshot({ path: 'test-results/02-logged-in.png' });

    // Step 3: Click menu / go to My Account
    await profilePage.goToMyProfile();
    await page.screenshot({ path: 'test-results/03-my-account.png' });

    // Step 4: Click Edit Profile
    await profilePage.clickEditProfile();
    await page.screenshot({ path: 'test-results/04-edit-profile.png' });

    // Step 5: Upload new profile picture
    await profilePage.uploadProfilePicture(AVATAR);
    await page.screenshot({ path: 'test-results/05-picture-selected.png' });

    // Step 6: Save and assert update confirmation
    await profilePage.saveProfile();
    await page.screenshot({ path: 'test-results/06-profile-updated.png' });
    await profilePage.assertProfileUpdated();
  });
});
