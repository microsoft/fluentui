import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: 'list',
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
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.spec\.ts$/,
    },
  ],
  webServer: {
    // double-quotes are required for Windows
    command: `node -e "import('express').then(({ default: e }) => e().use(e.static('./dist/storybook')).listen(6006))"`,
    port: 6006,
    reuseExistingServer: process.env.CI ? false : true,
  },
};

export default config;
