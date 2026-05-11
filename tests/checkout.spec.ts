import { test } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../test-data/users";

const shipping = {
  firstName: "Test",
  lastName: "User",
  postalCode: "90210",
};

test.describe("Checkout flow", () => {
  test("@smoke should complete checkout from cart to order confirmation", async ({
    page,
  }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();

    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.startCheckout();

    await checkoutPage.expectCheckoutInformationScreen();
    await checkoutPage.enterShippingInformation(
      shipping.firstName,
      shipping.lastName,
      shipping.postalCode,
    );
    await checkoutPage.continueToOverview();

    await checkoutPage.expectOverviewScreen();
    await checkoutPage.finishCheckout();

    // Assert
    await checkoutPage.expectOrderComplete();
  });
});
