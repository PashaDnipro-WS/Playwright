import { expect, type Locator, type Page } from '@playwright/test';

import { urls } from '../utils/urls';
import { NavBar } from '../sections/NavBar';
import { RevisionsTable } from '../sections/RevisionsTable';

export class RepositoryPage {
    readonly navBar: NavBar;
    readonly revisionsTable: RevisionsTable;

    readonly heading: Locator;
    readonly statisticsLink: Locator;
    readonly revisionInput: Locator;

    constructor(private page: Page) {
        this.navBar = new NavBar(page);
        this.revisionsTable = new RevisionsTable(page);

        this.heading = page.getByRole('heading', {
            name: 'svn',
        });

        this.statisticsLink = page.getByRole('link', {
            name: 'Statistics',
        });

        this.revisionInput = page.locator('#rev');
    }

    async goto() {
        await this.page.goto(urls.repository);
    }

    async expectOpened() {
        await expect(this.heading).toBeVisible();
        await expect(this.statisticsLink).toBeVisible();
        await expect(this.revisionInput).toBeVisible();
        await this.revisionsTable.expectVisible();
    }

    async expectRevisionOpened(revision: string) {
        await expect(
            this.page.getByRole('heading', {
                name: `svn @ ${revision}`,
            })
        ).toBeVisible();
    }

    async expectComparedRevisions(rev: string, revTo: string) {
        await expect(this.page).toHaveURL(new RegExp(`rev=${rev}`));
        await expect(this.page).toHaveURL(new RegExp(`rev_to=${revTo}`));
    }

    async openStatistics() {
        await this.statisticsLink.click();
    }

    async searchRevision(revision: string) {
        await this.revisionInput.fill(revision);
        await this.revisionInput.press('Enter');
    }
}