import { test, expect } from '../fixtures/fixtures';

test.use({
    storageState: 'playwright/.auth/user.json',
});

test('@auth user can open account page with saved session', async ({
    accountPage,
}) => {
    await accountPage.goto();

    await accountPage.expectOpened();

    await expect(accountPage.header.signOutLink).toBeVisible();
});