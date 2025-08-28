import { Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Get all item names in the overview
  async getItemNames(): Promise<string[]> {
    return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async isItemPresent(itemName: string): Promise<boolean> {
    const names = await this.getItemNames();
    return names.includes(itemName);
  }

  async finishCheckout() {
    await this.page.click('[data-test="finish"]');
  }
}