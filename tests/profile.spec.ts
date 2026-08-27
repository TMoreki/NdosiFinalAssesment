import { test, expect } from '../src/fixtures/CustomFixtures';
import { TestData } from '../src/data/Testdata';

test.describe('Profile Picture Update', () => {
  test('should login, navigate to profile and upload a new profile picture', async ({
    page,
    loginPage,
    profilePage,
    avatarPath,
  }) => {
    // Step 1: Login
    await loginPage.goto();
    await loginPage.screenshot('01-login-page');
    await loginPage.login(TestData.user.email, TestData.user.password);

    // Step 2: Verify logged in
    await profilePage.assertLoggedIn();
    await profilePage.screenshot('02-logged-in');

    // Step 3: My Account
    await profilePage.goToMyProfile();
    await profilePage.screenshot('03-my-account');

    // Step 4: Edit Profile
    await profilePage.clickEditProfile();
    await profilePage.screenshot('04-edit-profile');

    // Step 5: Upload picture
    await profilePage.uploadProfilePicture(avatarPath);
    await profilePage.screenshot('05-picture-selected');

    // Step 6: Save and assert
    await profilePage.saveProfile();
    await page.waitForTimeout(3000);
    await profilePage.screenshot('06-profile-updated');
    await profilePage.assertProfileUpdated();
    await page.waitForTimeout(3000);
  });
});
