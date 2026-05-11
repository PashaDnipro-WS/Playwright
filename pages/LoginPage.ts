import { expect, type Locator, type Page } from '@playwright/test';

import { urls } from '../utils/urls';

export class LoginPage {
  readonly loginInput: Locator;
  readonly passwordInput: Locator;

  readonly loginButton: Locator;
  readonly stayLoggedInCheckbox: Locator;

  readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.loginInput = page.getByRole('textbox', {
      name: 'Login',
    });

    this.passwordInput = page.locator('#password');

    this.loginButton = page.getByRole('button', {
      name: 'Login',
    });

    this.stayLoggedInCheckbox = page.getByRole('checkbox', {
      name: 'Stay logged in',
    });

    this.errorMessage = page.locator('#flash_error');
  }

  async goto() {
    await this.page.goto(urls.login);
  }

  async expectOpened() {
    await expect(this.loginInput).toBeVisible();

    await expect(this.passwordInput).toBeVisible();

    await expect(this.loginButton).toBeVisible();
  }

  async login(login: string, password: string) {
    await this.loginInput.fill(login);

    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }

  async loginAndStayLoggedIn(
    username: string,
    password: string
  ) {
    await this.loginInput.fill(username);

    await this.passwordInput.fill(password);

    await this.stayLoggedInCheckbox.check();

    await this.loginButton.click();
  }

  async expectLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }
}