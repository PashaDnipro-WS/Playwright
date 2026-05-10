// sections/NavBar.ts

import { expect, type Locator, type Page } from '@playwright/test';

export class NavBar {
  readonly overviewLink: Locator;
  readonly downloadLink: Locator;
  readonly activityLink: Locator;
  readonly roadmapLink: Locator;
  readonly issuesLink: Locator;
  readonly newsLink: Locator;
  readonly wikiLink: Locator;
  readonly forumsLink: Locator;
  readonly repositoryLink: Locator;

  constructor(private page: Page) {
    this.overviewLink = page.locator('#main-menu a[href="/projects/redmine"]');
    this.downloadLink = page.locator('#main-menu a[href="/projects/redmine/wiki/Download"]');
    this.activityLink = page.locator('#main-menu a[href="/projects/redmine/activity"]');
    this.roadmapLink = page.locator('#main-menu a[href="/projects/redmine/roadmap"]');
    this.issuesLink = page.locator('#main-menu a[href="/projects/redmine/issues"]');
    this.newsLink = page.locator('#main-menu a[href="/projects/redmine/news"]');
    this.wikiLink = page.locator('#main-menu a[href="/projects/redmine/wiki"]');
    this.forumsLink = page.locator('#main-menu a[href="/projects/redmine/boards"]');
    this.repositoryLink = page.locator('#main-menu a[href="/projects/redmine/repository"]');
  }

  async expectVisible() {
    await expect(this.overviewLink).toBeVisible();
    await expect(this.downloadLink).toBeVisible();
    await expect(this.activityLink).toBeVisible();
    await expect(this.roadmapLink).toBeVisible();
    await expect(this.issuesLink).toBeVisible();
    await expect(this.newsLink).toBeVisible();
    await expect(this.wikiLink).toBeVisible();
    await expect(this.forumsLink).toBeVisible();
    await expect(this.repositoryLink).toBeVisible();
  }

  async openOverview() {
    await this.overviewLink.click();
  }

  async openDownload() {
    await this.downloadLink.click();
  }

  async openActivity() {
    await this.activityLink.click();
  }

  async openRoadmap() {
    await this.roadmapLink.click();
  }

  async openIssues() {
    await this.issuesLink.click();
  }

  async openNews() {
    await this.newsLink.click();
  }

  async openWiki() {
    await this.wikiLink.click();
  }

  async openForums() {
    await this.forumsLink.click();
  }

  async openRepository() {
    await this.repositoryLink.click();
  }
}