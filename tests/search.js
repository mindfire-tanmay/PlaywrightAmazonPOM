//@ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login_page');
const { LandingPage } = require('../pages/landing_page');
const { ProductPage } = require('../pages/product_page');

test.use({ storageState: 'utils/authState.json' })
test('Search for a product @search @smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const landingPage = new LandingPage(page);

  await loginPage.gotoAmazon();
  await expect(loginPage.usernameText).toBeVisible();
  
  const productPageWindowEvent = page.waitForEvent('popup');
  await landingPage.searchAndOpenProduct('rtx 3080');
  const productPageFixture = await productPageWindowEvent;
  const productPage = new ProductPage(productPageFixture);
  await expect(productPage.addToCartButton).toBeVisible();
});