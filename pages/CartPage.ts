import { Page, expect } from "@playwright/test";

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart.html/);
    await expect(this.page.locator('.title')).toHaveText('Your Cart');
  }

  async startCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
