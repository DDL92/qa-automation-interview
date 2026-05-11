import { test } from "./fixtures";
import { checkoutData } from "../test-data/checkout";

test.describe("Checkout flow", () => {
  test("@smoke should complete checkout from cart to order confirmation", async ({
    authenticatedApp,
  }) => {
    // Act
    await authenticatedApp.inventory.expectLoaded();

    await authenticatedApp.inventory.addBackpackToCart();
    await authenticatedApp.inventory.openCart();

    await authenticatedApp.cart.expectLoaded();
    await authenticatedApp.cart.startCheckout();

    await authenticatedApp.checkout.expectCheckoutInformationScreen();
    await authenticatedApp.checkout.enterShippingInformation(
      checkoutData.defaultShippingAddress.firstName,
      checkoutData.defaultShippingAddress.lastName,
      checkoutData.defaultShippingAddress.postalCode,
    );
    await authenticatedApp.checkout.continueToOverview();

    await authenticatedApp.checkout.expectOverviewScreen();
    await authenticatedApp.checkout.finishCheckout();

    // Assert
    await authenticatedApp.checkout.expectOrderComplete();
  });
});
