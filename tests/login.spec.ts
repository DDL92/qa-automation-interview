import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { users } from "../test-data/users";

test.describe("Login", () => {
  test("@smoke should login successfully with valid credentials", async ({
    page,
  }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    // Assert
    await inventoryPage.expectLoaded();
  });

  test("@regression should show error with invalid credentials", async ({
    page,
  }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(users.invalid.username, users.invalid.password);

    // Assert
    await loginPage.expectLoginError();
  });
});
