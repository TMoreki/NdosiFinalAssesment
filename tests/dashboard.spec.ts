import { test, expect } from '../src/fixtures/CustomFixtures';
import { TestData } from '../src/data/Testdata';

test.describe('Dashboard', () => {
  test('should display dashboard after login', async ({ loginPage, dashboardPage }) => {
    // Step 1: Navigate and login
    await loginPage.goto();
    await loginPage.screenshot('dashboard-01-login-page');
    await loginPage.login(TestData.user.email, TestData.user.password);

    // Step 2: Assert dashboard loaded
    await dashboardPage.assertDashboardLoaded();
    await dashboardPage.screenshot('dashboard-02-loaded');

    // Step 3: Assert menu visible
    await dashboardPage.assertWelcomeVisible();
    await dashboardPage.screenshot('dashboard-03-menu-visible');
  });
});
