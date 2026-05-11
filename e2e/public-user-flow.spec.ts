import { test } from '../fixtures/fixtures';

import { generateRegisterUser } from '../data/users';

test('user can submit registration form', async ({
    registerPage,
}) => {
    const user = generateRegisterUser();

    await registerPage.goto();

    await registerPage.expectOpened();

    await registerPage.register(user);

    await registerPage.expectSuccessMessageVisible();
});