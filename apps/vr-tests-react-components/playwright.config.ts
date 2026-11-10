import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4182';

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec-e2e.ts',
  outputDir: './dist/e2e-results',
  reporter: 'list',
  fullyParallel: true,
  workers: 2,
  retries: process.env.CI ? 2 : 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    ...devices['Desktop Chrome'],
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'svg', use: { baseURL: `${baseURL}/svg/` } },
    { name: 'fonts', use: { baseURL: `${baseURL}/fonts/` } },
  ],
  webServer: {
    command: 'node e2e/server.cjs',
    url: `${baseURL}/svg/index.json`,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
