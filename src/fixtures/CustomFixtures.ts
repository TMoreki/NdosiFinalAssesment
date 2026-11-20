import { test as base } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { DashboardPage } from '../pages/DashboardPage';

type CustomFixtures = {
  loginPage: LoginPage;
  profilePage: ProfilePage;
  dashboardPage: DashboardPage;
  avatarPath: string;
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  avatarPath: async ({}, use) => {
    await use(path.resolve(__dirname, '../../fixtures/avatar.png'));
  },
});

export { expect } from '@playwright/test';
