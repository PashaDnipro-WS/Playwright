import { test as setup } from '@playwright/test';

import { loginAsValidUser } from '../utils/auth';

setup('authenticate user', async ({ page }) => {
    await loginAsValidUser(page);

    await page.context().storageState({
        path: 'playwright/.auth/user.json',
    });
});