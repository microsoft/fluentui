/* eslint-env node */
import { execSync } from 'node:child_process';

try {
  const [major, minor, _patch] = process.versions.node.split('.').map(n => parseInt(n, 10));
  let env = {};
  if (major > 22 || (major === 22 && minor >= 18)) {
    env = { NODE_OPTIONS: '--no-experimental-strip-types' };
  }
  // Run the tests
  execSync(`playwright test`, {
    stdio: 'inherit',
    env: { ...env, ...process.env },
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}
