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

test('@auth user can open statistics page and interact with chart', async ({
    statisticsPage,
}) => {
    await statisticsPage.goto();

    await statisticsPage.expectOpened();

    await statisticsPage.chart.hoverFirstChartBar();
});

test('@auth user can compare selected repository revisions', async ({
    repositoryPage,
}) => {
    await repositoryPage.goto();

    await repositoryPage.expectOpened();

    await repositoryPage.revisionsTable.openAllRevisions();

    const selectedRevisions = await repositoryPage.revisionsTable.selectRandomRevisionsToCompare();

    await repositoryPage.revisionsTable.compareSelectedRevisions();

    await repositoryPage.expectComparedRevisions(
        selectedRevisions.rev,
        selectedRevisions.revTo
    );
});