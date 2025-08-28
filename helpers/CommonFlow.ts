import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class CommonFlow {
  private readonly page: Page;
  private readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  async login(username: string, password: string) {
    await this.loginPage.goto();
    await this.loginPage.login(username, password);
    await expect(this.page.locator('div.app_logo')).toBeVisible();
  }

  async loginAsStandardUser() {
    const username = process.env.USERNAME!;
    const password = process.env.PASSWORD!;
    await this.login(username, password);
  }
}