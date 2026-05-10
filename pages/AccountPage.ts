import { expect, type Locator, type Page } from '@playwright/test';

import { urls } from '../utils/urls';
import { Header } from '../sections/Header';

export class AccountPage {
    readonly header: Header;

    readonly heading: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly saveButton: Locator;
    readonly changePasswordLink: Locator;

    constructor(private page: Page) {
        this.header = new Header(page);

        this.heading = page.getByRole('heading', {
            name: 'My account',
        });

        this.firstNameInput = page.getByRole('textbox', {
            name: 'First name *',
        });

        this.lastNameInput = page.getByRole('textbox', {
            name: 'Last name *',
        });

        this.emailInput = page.getByRole('textbox', {
            name: 'Email *',
        });

        this.saveButton = page.getByRole('button', {
            name: 'Save',
        });

        this.changePasswordLink = page.getByRole('link', {
            name: 'Change password',
        });
    }

    async goto() {
        await this.page.goto(urls.account);
    }

    async expectOpened() {
        await expect(this.heading).toBeVisible();
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.saveButton).toBeVisible();
    }

    async expectUserData(firstName: string, lastName: string, email: string) {
        await expect(this.firstNameInput).toHaveValue(firstName);
        await expect(this.lastNameInput).toHaveValue(lastName);
        await expect(this.emailInput).toHaveValue(email);
    }

    async expectChangePasswordLinkVisible() {
        await expect(this.changePasswordLink).toBeVisible();
    }
}