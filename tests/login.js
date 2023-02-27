//@ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login_page');
const { credentials } = require('../utils/credentials');

test.describe('Login group @smoke @login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.amazon.in/');
  });

  test('User login negative', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.performLogin(credentials.userEmail, credentials.userWrongPassword);
    await expect(loginPage.errorMessage).toHaveText(/your password is incorrect/i);
  });

  test('User Login positive @saveAuth', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.performLogin(credentials.userEmail, credentials.userPassword);
    await expect(loginPage.usernameText).toBeVisible();
    await page.context().storageState({ path: 'utils/authState.json' });
  });

})