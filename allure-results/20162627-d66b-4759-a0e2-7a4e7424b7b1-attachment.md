# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/reqres.spec.ts >> Reqres API >> GET request should return user details with status 200
- Location: tests/api/reqres.spec.ts:4:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Reqres API", () => {
  4  |   test("GET request should return user details with status 200", async ({ request }) => {
  5  |     // Arrange
  6  |     const url = "https://reqres.in/api/users/2";
  7  | 
  8  |     // Act
  9  |     const response = await request.get(url);
  10 |     const responseBody = await response.json();
  11 | 
  12 |     // Assert
> 13 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  14 |     expect(responseBody).toEqual(
  15 |       expect.objectContaining({
  16 |         data: expect.objectContaining({
  17 |           id: 2,
  18 |           email: expect.any(String),
  19 |           first_name: expect.any(String),
  20 |           last_name: expect.any(String),
  21 |         }),
  22 |       }),
  23 |     );
  24 |   });
  25 | });
  26 | 
```