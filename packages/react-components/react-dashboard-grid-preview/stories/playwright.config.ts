import { defineConfig, devices } from '@playwright/test';

const isCI = process.env.CI === 'true';
const externalStorybookUrl = process.env.DASHBOARD_STORYBOOK_URL;
const storybookUrl = externalStorybookUrl ?? 'http://localhost:6006';

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  outputDir: './e2e/test-results',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  reporter: isCI ? 'github' : 'list',
  use: {
    baseURL: storybookUrl,
    locale: 'en-US',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: {
      width: 1280,
      height: 900,
    },
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
      use: {
        ...devices['Desktop Safari'],
        deviceScaleFactor: 1,
      },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: externalStorybookUrl
    ? undefined
    : {
        command:
          'yarn nx run react-dashboard-grid-preview-stories:storybook -- --port=6006',
        url: storybookUrl,
        reuseExistingServer: !isCI,
        timeout: 180_000,
      },
});
