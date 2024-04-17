import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: 'list',
  testMatch: /.*\.spec\.ts$/,
  retries: 3,
  fullyParallel: process.env.CI ? false : true,
  timeout: process.env.CI ? 10000 : 30000,
  use: {
    baseURL: 'http://localhost:6006/iframe.html',
    viewport: {
      height: 720,
      width: 1280,
    },
  },
  webServer: {
    // double-quotes are required for Windows
    command: `node -e "import('express').then(({ default: e }) => e().use(e.static('./dist/storybook')).listen(6006))"`,
    port: 6006,
    reuseExistingServer: process.env.CI ? false : true,
  },
};

export default config;
