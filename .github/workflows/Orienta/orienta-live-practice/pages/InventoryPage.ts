import { expect, Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);

    await expect(
      this.page.locator('[data-test="inventory-container"]')
    ).toBeVisible();
  }

  async addFirstProductToCart(): Promise<void> {
    await this.page
      .locator('[data-test^="add-to-cart"]')
      .first()
      .click();
  }

  async expectCartCount(count: string): Promise<void> {
    await expect(
      this.page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText(count);
  }
}
