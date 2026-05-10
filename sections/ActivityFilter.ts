import { expect, type Locator, type Page } from '@playwright/test';

export class ActivityFilter {
    readonly dateInput: Locator;
    readonly userSelect: Locator;

    readonly issuesCheckbox: Locator;
    readonly changesetsCheckbox: Locator;
    readonly newsCheckbox: Locator;
    readonly messagesCheckbox: Locator;
    readonly subprojectsCheckbox: Locator;

    readonly applyButton: Locator;

    constructor(private page: Page) {
        this.dateInput = page.locator('#from');

        this.userSelect = page.getByRole('combobox');

        this.issuesCheckbox = page.getByRole('checkbox', {
            name: 'Issues',
        });

        this.changesetsCheckbox = page.getByRole('checkbox', {
            name: 'Changesets',
        });

        this.newsCheckbox = page.getByRole('checkbox', {
            name: 'News',
        });

        this.messagesCheckbox = page.getByRole('checkbox', {
            name: 'Messages',
        });

        this.subprojectsCheckbox = page.getByRole('checkbox', {
            name: 'Subprojects',
        });

        this.applyButton = page.getByRole('button', {
            name: 'Apply',
        });
    }

    async expectVisible() {
        await expect(this.dateInput).toBeVisible();

        await expect(this.userSelect).toBeVisible();

        await expect(this.issuesCheckbox).toBeVisible();
        await expect(this.changesetsCheckbox).toBeVisible();
        await expect(this.newsCheckbox).toBeVisible();
        await expect(this.messagesCheckbox).toBeVisible();
        await expect(this.subprojectsCheckbox).toBeVisible();

        await expect(this.applyButton).toBeVisible();
    }

    async setDate(date: string) {
        await this.dateInput.fill(date);
    }

    async selectUser(user: string) {
        await this.userSelect.selectOption({ label: user });
    }

    async checkAll() {
        await this.issuesCheckbox.check();
        await this.changesetsCheckbox.check();
        await this.newsCheckbox.check();
        await this.messagesCheckbox.check();
        await this.subprojectsCheckbox.check();
    }

    async uncheckAll() {
        await this.issuesCheckbox.uncheck();
        await this.changesetsCheckbox.uncheck();
        await this.newsCheckbox.uncheck();
        await this.messagesCheckbox.uncheck();
        await this.subprojectsCheckbox.uncheck();
    }

    async checkIssues() {
        await this.issuesCheckbox.check();
    }

    async uncheckIssues() {
        await this.issuesCheckbox.uncheck();
    }

    async checkChangesets() {
        await this.changesetsCheckbox.check();
    }

    async uncheckChangesets() {
        await this.changesetsCheckbox.uncheck();
    }

    async checkNews() {
        await this.newsCheckbox.check();
    }

    async uncheckNews() {
        await this.newsCheckbox.uncheck();
    }

    async checkMessages() {
        await this.messagesCheckbox.check();
    }

    async uncheckMessages() {
        await this.messagesCheckbox.uncheck();
    }

    async checkSubprojects() {
        await this.subprojectsCheckbox.check();
    }

    async uncheckSubprojects() {
        await this.subprojectsCheckbox.uncheck();
    }

    async apply() {
        await this.applyButton.click();
    }
}