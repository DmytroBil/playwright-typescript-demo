import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CommonFlow } from '../helpers/CommonFlow';

test('sort products by price', async ({ page }) => {
  const flow = new CommonFlow(page);
  const productsPage = new ProductsPage(page);

  await flow.loginAsStandardUser();

  await productsPage.sortByPriceLowToHigh();
  const prices = await productsPage.getAllPrices();

  // Validate ascending order
  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});