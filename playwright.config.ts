import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  expect: {
    timeout: 5000,
  },

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['list'],
  ],

  use: {
    baseURL:
      process.env.BASE_URL || 'https://www.saucedemo.com',

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
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
