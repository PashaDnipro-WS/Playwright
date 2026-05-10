import { type Page } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/users';

export async function loginAsValidUser(page: Page) {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        users.validUser.login,
        users.validUser.password
    );
}