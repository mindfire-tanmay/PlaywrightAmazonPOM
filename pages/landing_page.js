const { expect } = require('@playwright/test');
exports.LandingPage = class LandingPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByLabel(/search amazon/i);
    this.searchButton = page.getByRole('button', { name: 'Go', exact: true} );
    this.firstProduct = page.locator('div[data-component-type*="search-result"] img').nth(1);
  }

  async searchAndOpenProduct(searchText) {
    await this.searchInput.fill(searchText);
    await this.searchButton.click();
    await expect(this.firstProduct).toBeVisible();
    await this.firstProduct.click();
  }
}