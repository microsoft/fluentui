import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: 'list',
  retries: 3,
  fullyParallel: process.env.CI ? false : true,
  timeout: process.env.CI ? 10000 : 30000,
  use: {
    baseURL: 'http://localhost:5173',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'yarn vite preview test/harness',
    port: 5173,
    reuseExistingServer: true,
  },
};

export default config;
