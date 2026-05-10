import { expect, type Page } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

import { users } from '../data/users';
import { urls } from './urls';

export async function loginAsValidUser(page: Page) {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        users.validUser.login,
        users.validUser.password
    );

    if (page.url().includes(urls.twoFactorConfirmation)) {
        await page.pause();
    }

    await expect(page).toHaveURL(
        new RegExp(`${urls.myPage}$`)
    );
}

export async function expectUserIsLoggedIn(page: Page) {
    await expect(
        page.getByRole('link', {
            name: 'Sign out',
        })
    ).toBeVisible();
}