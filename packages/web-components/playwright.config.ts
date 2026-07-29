import defaultConfig from '@microsoft/fast-test-harness/playwright.config.mjs';
import { defineConfig, devices } from '@playwright/test';

const CI = process.env.CI === 'true';

// Duplicate each browser project across CSR and SSR rendering modes so a
// single `playwright test` run exercises both. Per-test overrides
// (e.g. `test.use({ ssr: true })`) still take precedence over the
// project-level value.
//
// TODO: Remove this local axis once the equivalent change lands in
// @microsoft/fast-test-harness/playwright.config.mjs.
const browsers = [
  { name: 'chromium', use: devices['Desktop Chrome'] },
  { name: 'firefox', use: devices['Desktop Firefox'] },
  {
    name: 'webkit',
    use: {
      ...devices['Desktop Safari'],
      deviceScaleFactor: 1,
    },
  },
];

const modes = [
  { suffix: 'csr', ssr: false },
  { suffix: 'ssr', ssr: true },
];

const projects = browsers.flatMap(browser =>
  modes.map(mode => ({
    name: `${browser.name}-${mode.suffix}`,
    use: { ...browser.use, ssr: mode.ssr },
  })),
);

export default defineConfig({
  ...defaultConfig,
  projects,
  reporter: CI ? 'github' : 'list',
  testMatch: 'src/**/*.spec.ts',
});
