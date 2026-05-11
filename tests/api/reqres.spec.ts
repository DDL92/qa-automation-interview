import { test, expect } from "@playwright/test";

test.describe("JSONPlaceholder API", () => {
  test("@api GET request should return user details with status 200", async ({
    request,
  }) => {
    // Arrange
    const url = "/users/1";

    // Act
    const response = await request.get(url);
    const responseBody = await response.json();

    // Assert
    expect(response.status()).toBe(200);
    expect(responseBody).toEqual(
      expect.objectContaining({
        id: 1,
        email: expect.any(String),
        name: expect.any(String),
        username: expect.any(String),
      }),
    );
  });
});
