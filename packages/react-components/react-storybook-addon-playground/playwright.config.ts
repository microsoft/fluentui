/* eslint-disable import/no-extraneous-dependencies */
import { devices, type PlaywrightTestConfig } from '@playwright/test';

const port = 4178;

const config: PlaywrightTestConfig = {
  reporter: 'list',
  retries: process.env.CI ? 2 : 0,
  fullyParallel: false,
  workers: 1,
  timeout: 90_000,
  expect: { timeout: 30_000 },
  use: {
    baseURL: `http://localhost:${port}`,
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.spec-e2e\.ts$/,
    },
  ],
  webServer: {
    // Builds the fixture runtime with the addon's `webpackFinal`, then serves it next to the prebuilt shell.
    command: `node e2e/server.cjs --port ${port}`,
    url: `http://localhost:${port}/playground/runtime/manifest.json`,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
