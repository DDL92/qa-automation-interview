import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('should login and add product to cart', async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Act
  await loginPage.goto();

  await loginPage.login('standard_user', 'secret_sauce');

  // Assert
  await inventoryPage.expectLoaded();

  // Act
  await inventoryPage.addFirstProductToCart();

  // Assert
  await inventoryPage.expectCartCount('1');
});
