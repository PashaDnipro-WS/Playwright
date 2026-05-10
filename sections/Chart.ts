import { expect, type Locator, type Page } from '@playwright/test';

export class Chart {
  readonly statisticsHeading: Locator;
  readonly charts: Locator;
  readonly tooltip: Locator;

  constructor(private page: Page) {
    this.statisticsHeading = page.getByRole('heading', {
      name: 'Statistics',
    });

    this.charts = page.locator('canvas');

    this.tooltip = page.getByText(/Changes: \d+/);
  }

  async expectVisible() {
    await expect(this.statisticsHeading).toBeVisible();
    await expect(this.charts.first()).toBeVisible();
  }

  async hoverFirstChartBar() {
    const chart = this.charts.first();

    await expect(chart).toBeVisible();

    const box = await chart.boundingBox();

    if (!box) {
      throw new Error('Chart canvas was not found');
    }

    await this.page.mouse.move(
      box.x + box.width * 0.55,
      box.y + box.height * 0.25
    );
  }

  async expectTooltipVisible() {
    await expect(this.tooltip).toBeVisible();
  }
}