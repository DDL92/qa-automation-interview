import { test as base, expect, type Page } from "@playwright/test";
import { AppPages } from "../pages/AppPages";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../test-data/users";

type AppFixtures = {
  app: AppPages;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedApp: AppPages;
  loggedInPage: Page;
  loggedInInventoryPage: InventoryPage;
  loggedInCartPage: CartPage;
  loggedInCheckoutPage: CheckoutPage;
};

export const test = base.extend<AppFixtures>({
  app: async ({ page }, use) => {
    await use(new AppPages(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  loggedInPage: async ({ loginPage, page }, use) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await page.waitForURL(/inventory.html/);
    await use(page);
  },

  authenticatedApp: async ({ loggedInPage }, use) => {
    await use(new AppPages(loggedInPage));
  },

  loggedInInventoryPage: async ({ loggedInPage }, use) => {
    await use(new InventoryPage(loggedInPage));
  },

  loggedInCartPage: async ({ loggedInPage }, use) => {
    await use(new CartPage(loggedInPage));
  },

  loggedInCheckoutPage: async ({ loggedInPage }, use) => {
    await use(new CheckoutPage(loggedInPage));
  },
});

export { expect } from "@playwright/test";
