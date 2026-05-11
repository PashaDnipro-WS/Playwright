import { test } from '../fixtures/fixtures';

import {
    loginAsValidUser,
    expectUserIsLoggedIn,
} from '../utils/auth';

test('@login user can login with valid credentials', async ({
    page,
}) => {
    await loginAsValidUser(page);

    await expectUserIsLoggedIn(page);
});