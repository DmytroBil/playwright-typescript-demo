import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CommonFlow } from '../helpers/CommonFlow';

test('add two products to cart', async ({ page }) => {
  const flow = new CommonFlow(page);
  const productsPage = new ProductsPage(page);

  const itemOne = 'Sauce Labs Backpack';
  const itemTwo = 'Sauce Labs Bike Light';

  await flow.loginAsStandardUser();

  await productsPage.addProductToCartByName(itemOne);
  await productsPage.addProductToCartByName(itemTwo);
  const cartCount = await productsPage.getCartCount();
  expect(cartCount).toBe(2);
});