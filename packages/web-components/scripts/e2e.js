/* eslint-env node */
import { execSync } from 'node:child_process';

try {
  // Run Playwright — the test harness server is spawned automatically
  // via the webServer config in playwright.config.ts.
  execSync(`playwright test ${process.argv.slice(2).join(' ')}`, {
    stdio: 'inherit',
    env: process.env,
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}
