import { defineConfig, devices, type ReporterDescription } from '@playwright/test';
import { env } from './config/env';

const uiTestIgnore = /tests\/api\//;
const apiTestMatch = /tests\/api\/.*\.spec\.ts/;
const reporters: ReporterDescription[] = [
  ['list'],
  ['html', { open: 'never' }],
];

if (env.ci) {
  reporters.push(['junit', { outputFile: 'test-results/junit.xml' }]);
}

if (env.enableAllure) {
  reporters.push(['allure-playwright']);
}

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  expect: {
    timeout: 5000,
  },

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: env.ci ? 2 : 0,

  workers: env.workers ?? (env.ci ? 1 : undefined),

  reporter: reporters,

  use: {
    baseURL: env.baseUrl,

    headless: true,

    viewport: {
      width: 1440,
      height: 900,
    },

    actionTimeout: 10000,

    navigationTimeout: 15000,

    screenshot: 'only-on-failure',

    trace: 'on-first-retry',

    video: 'retain-on-failure',

    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      testIgnore: uiTestIgnore,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      testIgnore: uiTestIgnore,
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      testIgnore: uiTestIgnore,
      use: {
        ...devices['Desktop Safari'],
      },
    },

    {
      name: 'api',
      testMatch: apiTestMatch,
      use: {
        baseURL: env.apiBaseUrl,
      },
    },
  ],
});
