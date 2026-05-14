import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API Tests', () => {
  test('@api GET user details should return status 200', async ({ request }) => {
    // Arrange
    const url = 'https://jsonplaceholder.typicode.com/users/1';

    // Act
    const response = await request.get(url);
    const responseBody = await response.json();

    // Assert
    expect(response.status()).toBe(200);
    expect(responseBody.id).toBe(1);
    expect(responseBody.email).toContain('@');
    expect(responseBody.name).toBeTruthy();
  });
});
