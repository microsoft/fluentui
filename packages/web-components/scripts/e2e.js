/* eslint-env node */
import { execSync, spawn } from 'node:child_process';

const uiMode = process.argv.includes('--ui');

try {
  // UI Mode runs Vite in development mode and Playwright in UI mode, in parallel
  if (uiMode) {
    const vite = spawn('vite', ['serve', 'test/harness'], { stdio: 'inherit' });
    const playwright = spawn('playwright', ['test', '--ui'], { stdio: 'inherit' });

    // Forward the exit codes if the child processes exit
    vite.on('exit', code => process.exit(code));
    playwright.on('exit', code => process.exit(code));

    // Close the processes when the parent process exits
    process.on('exit', () => {
      vite.kill();
      playwright.kill();
      process.exit(0);
    });

    // Run both processes in parallel
    Promise.all([vite, playwright]);
  }

  // E2E Mode first builds the test harness with Vite and then runs the tests with Playwright
  if (!uiMode) {
    // Build the test harness
    execSync(`vite build test/harness`, { stdio: 'inherit' });

    // Run the tests
    execSync(`playwright test`, { stdio: 'inherit' });
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}
