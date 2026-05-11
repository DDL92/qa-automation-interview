import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async expectCheckoutInformationScreen() {
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
    await expect(
      this.page.getByText('Checkout: Your Information', { exact: true }),
    ).toBeVisible();
  }

  async enterShippingInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async continueToOverview() {
    await this.page.locator('[data-test="continue"]').click();
  }

  async expectOverviewScreen() {
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
    await expect(
      this.page.getByText('Checkout: Overview', { exact: true }),
    ).toBeVisible();
  }

  async finishCheckout() {
    await this.page.locator('[data-test="finish"]').click();
  }

  async expectOrderComplete() {
    await expect(this.page).toHaveURL(/checkout-complete.html/);
    await expect(this.page.locator('[data-test="complete-header"]')).toHaveText(
      'Thank you for your order!',
    );
  }
}
