import { Page, expect } from "@playwright/test";

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart.html/);
    await expect(
      this.page.getByText('Your Cart', { exact: true }),
    ).toBeVisible();
  }

  async startCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
