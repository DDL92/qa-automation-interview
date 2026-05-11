import { test as base, expect, type Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../test-data/users";

export type AuthFixtures = {
  loginPage: LoginPage;
  loggedInPage: Page;
};

export const test = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  loggedInPage: async ({ loginPage, page }, use) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await page.waitForURL(/inventory.html/);
    await use(page);
  },
});

export { expect } from "@playwright/test";
