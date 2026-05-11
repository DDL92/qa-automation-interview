# QA Automation Interview Framework

Interview-ready QA automation framework using Playwright, TypeScript, Page Object Model, reusable test data, GitHub Actions, and reporting.

## Tech Stack
- Playwright
- TypeScript
- GitHub Actions
- Allure Reporter
- Cypress demo

## Run Tests

```bash
npm install
npm test
npm run test:smoke
npm run test:regression
npm run test:api
npm run typecheck
npm run report
```

## Enterprise Architecture Direction

Current framework responsibilities are split across:

- `config/`: typed environment and runtime configuration.
- `pages/`: page objects and `AppPages` composition root.
- `test-data/`: reusable test personas and scenario data.
- `tests/fixtures.ts`: the single Playwright fixture entry point.
- `tests/api/`: API-only tests that run in the `api` project.

Recommended next folder evolution as the suite grows:

```text
fixtures/
  test.ts
  auth.fixture.ts
  pageObjects.fixture.ts
pages/
  base.page.ts
  app.pages.ts
tests/
  ui/
  api/
test-data/
  users.ts
  checkout.ts
utils/
  apiClient.ts
  testAnnotations.ts
config/
  env.ts
```
