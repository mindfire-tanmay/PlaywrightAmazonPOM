const { expect } = require('@playwright/test');
exports.ProductPage = class ProductPage {
  constructor(page) {
    this.page = page;
    this.accountLink = page.locator('#nav-link-accountList');
    this.signOutButton = page.getByRole('link', { name: 'Sign Out', exact: true });
    this.addToCartButton = page.getByTitle('Add to Shopping Cart');
    this.otherAddToCartButton = page.getByRole('button', { name: 'Add to Cart' }).first();
    this.goToCartButton = page.locator('a#nav-cart');
    this.deleteItemButton = page.locator('input[data-action="delete"]');
    this.checkoutButton = page.getByRole('button', { name: 'Proceed to checkout' });
    this.useAddressButton = page.getByRole('button', { name: 'Use this address' });
    this.homePageLink = page.getByRole('link', { name: 'Amazon.in homepage' });
    this.addedToCartText = page.locator('span').getByText('Added to Cart');
    this.shoppingCartText = page.locator('h1').getByText('Shopping Cart');
    this.removedFromCartText = page.locator('div[data-action="delete"] span').getByText(/was removed from shopping cart/i).first();
    this.usernameText = page.locator('a#nav-link-accountList:has-text("Hello, Testcafe")');
    this.signInHeader = page.locator('h1').getByText('Sign in');
  }

  async addToCartAndCheckout(){
    await this.addToCartButton.click();
    await expect(this.addedToCartText).toBeVisible();
    await this.otherAddToCartButton.click();
    await expect(this.addedToCartText).toBeVisible();
    await this.goToCartButton.click();
    await expect(this.shoppingCartText).toBeVisible();
    await this.deleteItemButton.first().click();
    await expect(this.removedFromCartText).toBeVisible();
    await this.checkoutButton.click();
    await this.useAddressButton.click();
    await this.homePageLink.click();
    await expect(this.usernameText).toBeVisible();
  }

  async removeAllItemFromCart() {
    await this.goToCartButton.click();
    const itemCount = await this.deleteItemButton.count();
    for (let index = 0; index < itemCount; index++) {
      await this.deleteItemButton.first().click();
      await expect(this.removedFromCartText).toBeVisible();
      await expect(await this.deleteItemButton.count()).toBeLessThan(itemCount);
    }
  }

  async logout(){
    await this.accountLink.hover();
    await this.signOutButton.click();
    await expect(this.signInHeader).toBeVisible();
  }
}