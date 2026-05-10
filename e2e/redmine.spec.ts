import { test, expect } from '@playwright/test';
import { urls } from '../utils/urls';

test('main page opens', async ({ page }) => {
  await page.goto(urls.main);

  await expect(page).toHaveTitle(/Redmine/);
});