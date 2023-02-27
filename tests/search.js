//@ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login_page');

test.use({ storageState: 'utils/authState.json' })
test('Search for a product', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoAmazon();
  await expect(loginPage.usernameText).toBeVisible();
});