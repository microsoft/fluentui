import defaultConfig from '@microsoft/fast-test-harness/playwright.config.mjs';
import { defineConfig } from '@playwright/test';

const CI = process.env.CI === 'true';

export default defineConfig({
  ...defaultConfig,
  reporter: CI ? 'github' : 'list',
  testMatch: 'src/**/*.spec.ts',
});
