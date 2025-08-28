import { Page } from '@playwright/test';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // returns array of product names
  async getCartItemNames(): Promise<string[]> {
    const items = this.page.locator('[data-test="inventory-item-name"]');
    return await items.allTextContents();
  }

  async checkout() {
    await this.page.click('[data-test="checkout"]');
  }

}