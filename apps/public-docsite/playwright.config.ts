import { defineConfig, devices } from '@playwright/test';

const port = 4332;

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec-e2e.ts',
  reporter: 'list',
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  expect: { timeout: 15_000 },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    viewport: { width: 320, height: 768 },
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `node e2e/server.cjs --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
  },
});
