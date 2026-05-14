import { test, expect } from '@playwright/test';

test.describe('Reqres API Tests', () => {

  test('GET user details should return status 200', async ({ request }) => {

    // Arrange
    const url = 'https://reqres.in/api/users/2';

    // Act
    const response = await request.get(url);

    // Assert
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.email).toContain('@reqres.in');
  });

});
