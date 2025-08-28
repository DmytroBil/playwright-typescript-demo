import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { CommonFlow } from '../helpers/CommonFlow';

test('checkout flow completes successfully', async ({ page }) => {
  const flow = new CommonFlow(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const overviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  const itemOne = 'Sauce Labs Backpack';
  const itemTwo = 'Sauce Labs Bike Light';

  await flow.loginAsStandardUser();

  await productsPage.addProductToCartByName(itemOne);
  await productsPage.addProductToCartByName(itemTwo);
  const cartCount = await productsPage.getCartCount();
  expect(cartCount).toBe(2);

  await productsPage.goToCart();
  const cartItems = await cartPage.getCartItemNames();
  expect(cartItems).toContain(itemOne);
  expect(cartItems).toContain(itemTwo);

  await cartPage.checkout();
  await checkoutPage.fillCheckoutInfo('John', 'Smith', '12345');
  await checkoutPage.clickContinue();

  const items = await overviewPage.getItemNames();
  expect(items).toContain(itemOne);
  expect(items).toContain(itemTwo);

  await overviewPage.finishCheckout();
  await checkoutCompletePage.validateOrderCompleteText();
});