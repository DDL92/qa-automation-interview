import { Page, expect } from "@playwright/test";

export class InventoryPage {
  constructor(private readonly page: Page) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText(
      'Products',
    );
  }

  async addBackpackToCart() {
    await this.page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
