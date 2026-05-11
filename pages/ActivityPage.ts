import { expect, type Locator, type Page } from '@playwright/test';

import { urls } from '../utils/urls';
import { NavBar } from '../sections/NavBar';
import { ActivityFilter } from '../sections/ActivityFilter';

export class ActivityPage {
    readonly navBar: NavBar;
    readonly activityFilter: ActivityFilter;

    readonly heading: Locator;
    readonly activityItems: Locator;
    readonly previousLink: Locator;
    readonly nextLink: Locator;

    constructor(private page: Page) {
        this.navBar = new NavBar(page);
        this.activityFilter = new ActivityFilter(page);

        this.heading = page.locator('h2');

        this.activityItems = page.locator('#activity dl dt');
        this.previousLink = page.getByRole('link', { name: '« Previous' });
        this.nextLink = page.getByRole('link', { name: 'Next »' });
    }

    async goto() {
        await this.page.goto(urls.activity);
    }

    async expectOpened() {
        await expect(this.heading).toBeVisible();
        await this.activityFilter.expectVisible();
    }

    async expectActivityItemsVisible() {
        await expect(this.activityItems.first()).toBeVisible();
    }

    async expectFilteredByUser(userName: string) {
        await expect(this.heading).toContainText(userName);
    }

    async openPreviousActivityPage() {
        await this.previousLink.click();
    }

    async openNextActivityPage() {
        await this.nextLink.click();
    }

    // dynamic locator

    defectLink(defectId: string) {
        return this.page.getByRole('link', {
            name: new RegExp(`Defect #${defectId}`),
        });
    }

    async expectDefectVisible(defectId: string) {
        await expect(this.defectLink(defectId)).toBeVisible();
    }
}