import { expect, type Locator, type Page } from '@playwright/test';

type SelectedRevisions = {
  rev: string;
  revTo: string;
};

export class RevisionsTable {
  readonly table: Locator;
  readonly compareButtons: Locator;
  readonly showAllRevisionsLink: Locator;
  readonly revisionLinks: Locator;
  readonly fromRadios: Locator;
  readonly toRadios: Locator;
  readonly authorLinks: Locator;

  constructor(private page: Page) {
    this.table = page.getByRole('table').last();

    this.compareButtons = page.getByRole('button', {
      name: 'View differences',
    });

    this.showAllRevisionsLink = page.getByRole('link', {
      name: 'View all revisions'
    });

    this.revisionLinks = this.table.locator('tr td:first-child a');

    this.fromRadios = this.table.locator('input[name="rev"]');
    this.toRadios = this.table.locator('input[name="rev_to"]');
    this.authorLinks = this.table.locator('a[href*="/users/"]');
  }

  async expectRevisionVisible(revision: string) {
    await expect(
      this.revisionLinks.filter({
        hasText: revision,
      })
    ).toBeVisible();
  }

  async getFirstAuthorName() {
    return (
      await this.authorLinks.first().innerText()
    ).trim();
  }

  async openFirstAuthor() {
    await this.authorLinks.first().click();
  }

  // distinguish auth || public methods?

  async expectVisible() {
    await expect(this.table).toBeVisible();
    await expect(this.revisionLinks.first()).toBeVisible();
  }

  async openAllRevisions() {
    await this.showAllRevisionsLink.click();
  }

  getRandomIndex(max: number, exclude?: number) {
    let index = Math.floor(Math.random() * max);

    while (index === exclude) {
      index = Math.floor(Math.random() * max);
    }

    return index;
  }

  async selectRandomRevisionsToCompare(): Promise<SelectedRevisions> {
    const count = await this.fromRadios.count();

    const firstIndex = this.getRandomIndex(count);
    const secondIndex = this.getRandomIndex(count, firstIndex);

    await this.fromRadios.nth(firstIndex).check();
    await this.toRadios.nth(secondIndex).check();

    const rev = await this.fromRadios.nth(firstIndex).inputValue();
    const revTo = await this.toRadios.nth(secondIndex).inputValue();

    return {
      rev: rev.trim(),
      revTo: revTo.trim(),
    };
  }

  async compareSelectedRevisions() {
    await this.compareButtons.last().click();
  }
}