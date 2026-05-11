import { test } from "./authFixtures";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { InventoryPage } from "../pages/InventoryPage";

const shipping = {
  firstName: "Test",
  lastName: "User",
  postalCode: "90210",
};

test.describe("Checkout flow", () => {
  test("@smoke should complete checkout from cart to order confirmation", async ({
    loggedInPage,
  }) => {
    // Arrange
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    const checkoutPage = new CheckoutPage(loggedInPage);

    // Act
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
