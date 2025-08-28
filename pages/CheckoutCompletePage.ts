import { Page, Locator, expect } from '@playwright/test';

export class CheckoutCompletePage {
  private page: Page;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async validateOrderCompleteText(expectedText: string = 'Thank you for your order!') {
    await expect(this.completeHeader).toHaveText(expectedText);
  }
}