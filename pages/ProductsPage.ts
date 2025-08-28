import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  private readonly page: Page;
  private readonly sortDropdown: Locator;
  private readonly productPrices: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = this.page.locator('[data-test="product-sort-container"]');
    this.productPrices = this.page.locator('[data-test="inventory-item-price"]');
    this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]'); // cart item count
  }

  // Add a product to cart by its visible name
  async addProductToCartByName(productName: string) {
    const button = this.page.locator(
      `.inventory_item:has-text("${productName}") button.btn_inventory`
    );
    await button.click();
  }

  async getCartCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return text ? parseInt(text) : 0;
  }

  async goToCart() {
    await this.page.click('[data-test="shopping-cart-link"]');
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
    await this.page.waitForTimeout(500); //wait for sorting to take effect
  }

  async getAllPrices(): Promise<number[]> {
    const pricesText = await this.productPrices.allTextContents();
    return pricesText.map(price => parseFloat(price.replace('$', '')));
  }
}