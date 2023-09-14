import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    specPattern: './tests/**/*.spec.ts',
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
