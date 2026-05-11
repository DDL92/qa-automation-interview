import { type Page } from "@playwright/test";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { InventoryPage } from "./InventoryPage";
import { LoginPage } from "./LoginPage";

export class AppPages {
  readonly cart: CartPage;
  readonly checkout: CheckoutPage;
  readonly inventory: InventoryPage;
  readonly login: LoginPage;

  constructor(page: Page) {
    this.cart = new CartPage(page);
    this.checkout = new CheckoutPage(page);
    this.inventory = new InventoryPage(page);
    this.login = new LoginPage(page);
  }
}
