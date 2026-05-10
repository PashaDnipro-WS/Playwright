import { type Locator, type Page } from '@playwright/test';

export class Header {
  readonly searchInput: Locator;
  readonly signInLink: Locator;
  readonly registerLink: Locator;
  readonly myAccountLink: Locator;
  readonly signOutLink: Locator;

  constructor(private page: Page) {
    this.searchInput = page.locator('#q');
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.myAccountLink = page.getByRole('link', { name: 'My account' });
    this.signOutLink = page.getByRole('link', { name: 'Sign out' });
  }

  async search(text: string) {
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');
  }

  async openLogin() {
    await this.signInLink.click();
  }

  async openRegister() {
    await this.registerLink.click();
  }

  async openMyAccount() {
    await this.myAccountLink.click();
  }

  async signOut() {
    await this.signOutLink.click();
  }
}