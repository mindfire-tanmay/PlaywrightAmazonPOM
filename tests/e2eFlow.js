//@ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login_page');
const { LandingPage } = require('../pages/landing_page');
const { ProductPage } = require('../pages/product_page');
const { credentials } = require('../utils/credentials');

test('e2e complete flow @e2e', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.gotoAmazon();
  await loginPage.performLogin(credentials.userEmail, credentials.userPassword);
  await expect(loginPage.usernameText).toBeVisible();

  const SearchProduct = new LandingPage(page);
  const productPageEvent = page.waitForEvent('popup');
  await SearchProduct.searchAndOpenProduct('rtx 3080');
  const productPage = await productPageEvent;

  const Product = new ProductPage(productPage);
  await Product.addToCartAndCheckout();
  await Product.removeAllItemFromCart();
  await Product.logout();
});