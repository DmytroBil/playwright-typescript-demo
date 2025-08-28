import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CommonFlow } from '../helpers/CommonFlow';

test('user can login successfully', async ({ page }) => {
  const flow = new CommonFlow(page);
  await flow.loginAsStandardUser();
});

test('shows error on invalid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('wrong', 'wrong');
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Epic sadface: Username and password do not match any user in this service');
});