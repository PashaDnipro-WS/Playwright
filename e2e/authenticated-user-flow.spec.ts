import { test, expect } from '../fixtures/fixtures';
import { urls } from '../utils/urls'

test.use({
    storageState: 'playwright/.auth/user.json',
});

test('@auth user can open account page and logout', async ({
    accountPage,
    page
}) => {
    await accountPage.goto();

    await accountPage.expectOpened();

    await expect(accountPage.header.signOutLink).toBeVisible();

    await accountPage.header.signOut();

    // await expect(page).toHaveURL(urls.main);

    await expect(accountPage.header.signInLink).toBeVisible();
});