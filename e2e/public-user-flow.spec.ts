import { test, expect } from '../fixtures/fixtures';

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

test('user can search repository revision', async ({
    repositoryPage,
    page,
}) => {
    const revision = '22222';

    await repositoryPage.goto();

    await repositoryPage.expectOpened();

    await repositoryPage.searchRevision(revision);

    await repositoryPage.expectRevisionOpened(revision);

    await expect(repositoryPage.revisionInput).toHaveValue(revision);

    await repositoryPage.revisionsTable.expectRevisionVisible(revision);
});