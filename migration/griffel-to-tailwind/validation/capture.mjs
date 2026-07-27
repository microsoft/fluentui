#!/usr/bin/env node
/**
 * Capture VR screenshots for a subset of stories from the built VR storybook.
 *
 * Usage:
 *   node migration/griffel-to-tailwind/validation/capture.mjs \
 *     --filter "Divider Converged" --out migration/griffel-to-tailwind/validation/baseline/divider \
 *     [--url apps/vr-tests-react-components/dist/storybook] [--expect 24]
 *
 * --filter is a regex prefix matched against StoryWright's "kind.name" id; everything
 * NOT matching is excluded via a negative-lookahead excludePattern.
 * Fails loudly if zero screenshots are produced (StoryWright exits 0 on browser-launch
 * failure — storybook-vr-infra report), or fewer than --expect.
 */
import { execFileSync, execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const args = {};
for (let i = 2; i < process.argv.length; i += 2) {
  args[process.argv[i].replace(/^--/, '')] = process.argv[i + 1];
}
const filter = args.filter;
const out = args.out;
if (!filter || !out) {
  console.error('required: --filter <kind-regex-prefix> --out <dir>');
  process.exit(2);
}
const url = args.url ?? 'apps/vr-tests-react-components/dist/storybook';
const expect = args.expect ? Number(args.expect) : 1;

if (!fs.existsSync(path.join(url, 'index.json'))) {
  console.error(`No built storybook at ${url} (missing index.json). Build it first:`);
  console.error('  yarn nx run vr-tests-react-components:build-storybook');
  process.exit(2);
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

// Negative lookahead: exclude every story whose "kind.name" does NOT start with filter.
const excludePattern = `^(?!${filter})`;
// Invoke the JS entry directly — .cmd shims route through cmd.exe, which mangles
// regex metacharacters (^, parens) in arguments.
const swMain = path.resolve('node_modules', 'storywright', 'bin', 'storywright.js');

console.log(`[capture] filter=/${filter}/ url=${url} out=${out}`);
const started = Date.now();
try {
  execFileSync(
    process.execPath,
    [
      swMain,
      '--browsers', 'chromium',
      '--url', url,
      '--destpath', out,
      '--excludePatterns', excludePattern,
      '--waitTimeScreenshot', '500',
      '--concurrency', '4',
      '--headless', 'true',
      '--bailOnStoriesError',
      '--stepsApi', 'parameters',
    ],
    { stdio: 'inherit' },
  );
} catch (err) {
  console.error(`[capture] storywright failed: ${err.message}`);
  process.exit(1);
}

const files = fs
  .readdirSync(out)
  .filter(f => f.endsWith('.png'))
  .sort();

let commit = 'unknown';
try {
  commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
} catch {}

const manifest = {
  filter,
  url,
  commit,
  capturedAt: new Date().toISOString(),
  elapsedMs: Date.now() - started,
  count: files.length,
  files,
};
fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(manifest, null, 2));

console.log(`[capture] ${files.length} screenshots in ${Math.round(manifest.elapsedMs / 1000)}s`);
if (files.length < expect) {
  console.error(`[capture] FAIL: expected >= ${expect} screenshots, got ${files.length}`);
  process.exit(1);
}
