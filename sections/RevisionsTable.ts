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

  constructor(private page: Page) {
    this.table = page.getByRole('table').last();

    this.compareButtons = page.getByRole('button', {
      name: 'View differences',
    });

    this.showAllRevisionsLink = page.getByRole('link', {
      name: 'View all revisions'
    });

    this.revisionLinks = this.table.getByRole('link', {
      name: /^\d+$/,
    });

    this.fromRadios = this.table.locator('input[name="rev"]');
    this.toRadios = this.table.locator('input[name="rev_to"]');
  }

  async expectRevisionVisible(revision: string) {
    await expect(
      this.revisionLinks.filter({
        hasText: revision,
      })
    ).toBeVisible();
  }

  // distinguish auth || public methods?

  async expectVisible() {
    await expect(this.table).toBeVisible();
    await expect(this.revisionLinks.first()).toBeVisible();
  }

  async openAllRevisions() {
    await this.showAllRevisionsLink.click();
  }

  async selectRandomRevisionsToCompare(): Promise<SelectedRevisions> {
    const count = await this.revisionLinks.count();

    const firstIndex = Math.floor(Math.random() * Math.min(count - 1, 10));
    const secondIndex = firstIndex + 1;

    const rev = await this.revisionLinks.nth(firstIndex).innerText();
    const revTo = await this.revisionLinks.nth(secondIndex).innerText();

    await this.fromRadios.nth(firstIndex).check();
    await this.toRadios.nth(secondIndex).check();

    return {
      rev: rev.trim(),
      revTo: revTo.trim(),
    };
  }

  async compareSelectedRevisions() {
    await this.compareButtons.last().click();
  }
}