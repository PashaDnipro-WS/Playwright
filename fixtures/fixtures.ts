import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountPage } from '../pages/AccountPage';
import { ActivityPage } from '../pages/ActivityPage';
import { RepositoryPage } from '../pages/RepositoryPage';
import { StatisticsPage } from '../pages/StatisticsPage';

import { expectUserIsLoggedIn } from '../utils/auth';

type Fixtures = {
    loginPage: LoginPage;
    registerPage: RegisterPage;
    accountPage: AccountPage;
    activityPage: ActivityPage;
    repositoryPage: RepositoryPage;
    statisticsPage: StatisticsPage;

    authenticatedPage: void;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },

    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },

    activityPage: async ({ page }, use) => {
        await use(new ActivityPage(page));
    },

    repositoryPage: async ({ page }, use) => {
        await use(new RepositoryPage(page));
    },

    statisticsPage: async ({ page }, use) => {
        await use(new StatisticsPage(page));
    },

    authenticatedPage: async ({ page }, use) => {
        await expectUserIsLoggedIn(page);

        await use();
    },
});

export { expect };