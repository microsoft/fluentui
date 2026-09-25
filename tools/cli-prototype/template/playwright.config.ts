import { defineConfig } from '@playwright/test';

const port = Number(process.env.FLUENTUI_FORUM_PORT ?? process.env.FLUENTUI_PLAYGROUND_PORT ?? 5179);

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  reporter: 'line',
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npm run dev -- --host 127.0.0.1 --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
  },
});
