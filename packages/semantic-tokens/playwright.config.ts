/* eslint-disable import/no-extraneous-dependencies */
import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: 'list',
  retries: 3,
  fullyParallel: process.env.CI ? false : true,
  timeout: process.env.CI ? 10000 : 30000,
  use: {
    baseURL: 'http://localhost:6006',
    viewport: {
      height: 720,
      width: 1280,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.spec-e2e\.ts$/,
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    //   testMatch: [/set-theme\.spec\.ts$/],
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    //   testMatch: [/set-theme\.spec\.ts$/],
    // },
  ],
  webServer: {
    command: `node scripts/server.js --port 6006`,
    port: 6006,
    reuseExistingServer: process.env.CI ? false : true,
  },
};

export default config;
