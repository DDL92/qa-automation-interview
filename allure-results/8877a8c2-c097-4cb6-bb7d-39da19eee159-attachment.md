# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.ts >> Checkout flow >> @smoke should complete checkout from cart to order confirmation
- Location: tests/checkout.spec.ts:15:7

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.complete-header')
Expected: "THANK YOU FOR YOUR ORDER"
Received: "Thank you for your order!"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.complete-header')
    9 × locator resolved to <h2 class="complete-header" data-test="complete-header">Thank you for your order!</h2>
      - unexpected value "Thank you for your order!"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
      - generic [ref=e15]: "Checkout: Complete!"
    - generic [ref=e16]:
      - img "Pony Express" [ref=e17]
      - heading "Thank you for your order!" [level=2] [ref=e18]
      - generic [ref=e19]: Your order has been dispatched, and will arrive just as fast as the pony can get there!
      - button "Back Home" [ref=e20] [cursor=pointer]
  - contentinfo [ref=e21]:
    - list [ref=e22]:
      - listitem [ref=e23]:
        - link "Twitter" [ref=e24]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e25]:
        - link "Facebook" [ref=e26]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e27]:
        - link "LinkedIn" [ref=e28]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e29]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import { Page, expect } from "@playwright/test";
  2  | 
  3  | export class CheckoutPage {
  4  |   constructor(private readonly page: Page) {}
  5  | 
  6  |   async expectCheckoutInformationScreen() {
  7  |     await expect(this.page).toHaveURL(/checkout-step-one.html/);
  8  |     await expect(this.page.locator('.title')).toHaveText('Checkout: Your Information');
  9  |   }
  10 | 
  11 |   async enterShippingInformation(
  12 |     firstName: string,
  13 |     lastName: string,
  14 |     postalCode: string,
  15 |   ) {
  16 |     await this.page.locator('[data-test="firstName"]').fill(firstName);
  17 |     await this.page.locator('[data-test="lastName"]').fill(lastName);
  18 |     await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  19 |   }
  20 | 
  21 |   async continueToOverview() {
  22 |     await this.page.locator('[data-test="continue"]').click();
  23 |   }
  24 | 
  25 |   async expectOverviewScreen() {
  26 |     await expect(this.page).toHaveURL(/checkout-step-two.html/);
  27 |     await expect(this.page.locator('.title')).toHaveText('Checkout: Overview');
  28 |   }
  29 | 
  30 |   async finishCheckout() {
  31 |     await this.page.locator('[data-test="finish"]').click();
  32 |   }
  33 | 
  34 |   async expectOrderComplete() {
  35 |     await expect(this.page).toHaveURL(/checkout-complete.html/);
> 36 |     await expect(this.page.locator('.complete-header')).toHaveText(
     |                                                         ^ Error: expect(locator).toHaveText(expected) failed
  37 |       'THANK YOU FOR YOUR ORDER',
  38 |     );
  39 |   }
  40 | }
  41 | 
```