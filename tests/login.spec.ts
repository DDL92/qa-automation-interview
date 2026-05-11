import { test } from "./fixtures";
import { users } from "../test-data/users";

test.describe("Login", () => {
  test("@smoke should login successfully with valid credentials", async ({
    app,
  }) => {
    // Act
    await app.login.goto();
    await app.login.login(users.standard.username, users.standard.password);

    // Assert
    await app.inventory.expectLoaded();
  });

  test("@regression should show error with invalid credentials", async ({
    app,
  }) => {
    // Act
    await app.login.goto();
    await app.login.login(users.invalid.username, users.invalid.password);

    // Assert
    await app.login.expectLoginError();
  });
});
