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

test('user can filter activity by date, user and issue type', async ({
    activityPage,
}) => {
    await activityPage.goto();

    await activityPage.expectOpened();

    await activityPage.activityFilter.setDate('2025-07-12');

    await activityPage.activityFilter.selectUser('Holger Just');

    await activityPage.activityFilter.uncheckAll();

    await activityPage.activityFilter.checkIssues();

    await activityPage.activityFilter.apply();

    await activityPage.expectDefectVisible('42997');
});

test('user is redirected to login page when opening statistics', async ({
    repositoryPage,
    loginPage,
    page,
}) => {
    await repositoryPage.goto();

    await repositoryPage.expectOpened();

    await repositoryPage.openStatistics();

    await expect(page).toHaveURL(/login/);

    await loginPage.expectOpened();
});

test('user can open repository author page and see selected author', async ({
    repositoryPage,
    page,
}) => {
    await repositoryPage.goto();

    await repositoryPage.expectOpened();

    const authorName = await repositoryPage.revisionsTable.getFirstAuthorName();

    await repositoryPage.revisionsTable.openFirstAuthor();

    await expect(page.getByRole('heading', { name: authorName, })).toBeVisible();
});