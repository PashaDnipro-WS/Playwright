import { expect, type Locator, type Page } from '@playwright/test';

import { urls } from '../utils/urls';

type RegisterUser = {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

export class RegisterPage {
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmationInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;

  readonly submitButton: Locator;

  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.loginInput = page.getByRole('textbox', {
      name: 'Login *',
    });

    this.passwordInput = page.locator('#user_password');

    this.confirmationInput = page.locator('#user_password_confirmation');

    this.firstNameInput = page.getByRole('textbox', {
      name: 'First name *',
    });

    this.lastNameInput = page.getByRole('textbox', {
      name: 'Last name *',
    });

    this.emailInput = page.getByRole('textbox', {
      name: 'Email *',
    });

    this.submitButton = page.getByRole('button', {
      name: 'Submit',
    });

    this.successMessage = page.locator('#flash_notice');

    this.errorMessage = page.locator('#errorExplanation');
  }

  async goto() {
    await this.page.goto(urls.register);
  }

  async expectOpened() {
    await expect(
      this.page.getByRole('heading', {
        name: 'Register',
      })
    ).toBeVisible();
  }

  async register(user: RegisterUser) {
    await this.loginInput.fill(user.login);

    await this.passwordInput.fill(user.password);

    await this.confirmationInput.fill(user.password);

    await this.firstNameInput.fill(user.firstName);

    await this.lastNameInput.fill(user.lastName);

    await this.emailInput.fill(user.email);

    await this.submitButton.click();
  }

  async expectSuccessMessageVisible() {
    await expect(this.successMessage).toBeVisible();
  }

  async expectErrorMessageVisible() {
    await expect(this.errorMessage).toBeVisible();
  }
}