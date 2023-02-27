const { expect } = require('@playwright/test');
exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.accountsButton = page.locator('#nav-link-accountList');
    this.emailInput = page.locator('#ap_email');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.passwordInput = page.getByLabel('Password');
    this.signinButton = page.getByRole('button', { name: 'Sign in' });
    this.usernameText = page.locator('a#nav-link-accountList:has-text("Hello, Testcafe")');
    this.errorMessage = page.locator('#auth-error-message-box span');
  }

  async gotoAmazon() {
    await this.page.goto('https://www.amazon.in/');
  }

  async performLogin(userEmail, userPassword) {
    await this.accountsButton.click();
    await this.emailInput.fill(userEmail);
    await this.continueButton.click();
    await this.passwordInput.fill(userPassword);
    await this.signinButton.click();
  }
}