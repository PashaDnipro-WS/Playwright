import { expect, type Locator, type Page } from '@playwright/test';

import { urls } from '../utils/urls';
import { Chart } from '../sections/Chart';

export class StatisticsPage {
  readonly chart: Chart;

  readonly heading: Locator;
  readonly backLink: Locator;

  constructor(private page: Page) {
    this.chart = new Chart(page);

    this.heading = page.getByRole('heading', {
      name: 'Statistics',
    });

    this.backLink = page.getByRole('link', {
      name: 'Back',
    });
  }

  async goto() {
    await this.page.goto(urls.statistics);
  }

  async expectOpened() {
    await expect(this.heading).toBeVisible();
    await this.chart.expectVisible();
  }

  async goBack() {
    await this.backLink.click();
  }
}