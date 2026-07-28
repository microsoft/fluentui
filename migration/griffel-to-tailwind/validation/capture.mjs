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

/**
 * Staleness guard — the harness's worst failure mode is a SILENT one.
 *
 * `vr-tests-react-components:build-storybook` is an nx-cached target. Until 2026-07-28 its
 * hash covered only the app dir plus `react-storybook-addon`'s dependency closure, so
 * editing a converted package's `src/` (a `*.module.css` in particular) left the hash
 * unchanged and nx replayed the PREVIOUS `dist/storybook` — "existing outputs match the
 * cache, left as is". A capture taken then is the previous build's pixels, which match the
 * baseline whatever the new code renders: a false PASS. react-infolabel shipped a broken
 * icon swap through two green VR rounds exactly this way.
 *
 * The nx inputs are fixed, but the failure is silent enough to be worth a second lock:
 * if any component source is NEWER than the built bundles, refuse to capture.
 */
const bundleMtime = fs
  .readdirSync(url)
  .filter(f => f.endsWith('.js'))
  .reduce((max, f) => Math.max(max, fs.statSync(path.join(url, f)).mtimeMs), 0);

const componentsRoot = path.join('packages', 'react-components');
const newerSources = [];
if (bundleMtime && fs.existsSync(componentsRoot)) {
  const walk = dir => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // `temp/` holds build-time generated files (react-storybook-addon/temp/preset.ts is
        // rewritten by its own build) and is always newer than the bundles it produced.
        if (['node_modules', 'dist', 'lib', 'lib-commonjs', 'temp'].includes(entry.name)) continue;
        walk(full);
      } else if (/\.(module\.css|tsx?)$/.test(entry.name) && fs.statSync(full).mtimeMs > bundleMtime) {
        newerSources.push(full);
      }
    }
  };
  walk(componentsRoot);
}
if (newerSources.length > 0) {
  console.error(`[capture] FAIL: ${newerSources.length} component source(s) are newer than ${url}.`);
  console.error('[capture] The built storybook does not contain your changes — capturing now would');
  console.error('[capture] compare the PREVIOUS build against the baseline and PASS for the wrong reason.');
  for (const f of newerSources.slice(0, 5)) console.error(`[capture]   ${f}`);
  if (newerSources.length > 5) console.error(`[capture]   … and ${newerSources.length - 5} more`);
  console.error('[capture] Rebuild first, and check the log line reads');
  console.error('[capture]   "> nx run vr-tests-react-components:build-storybook"');
  console.error('[capture] with NO "[existing outputs match the cache]" / "[local cache]" suffix:');
  console.error('[capture]   yarn nx run vr-tests-react-components:build-storybook --skip-nx-cache');
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
      '--browsers',
      'chromium',
      '--url',
      url,
      '--destpath',
      out,
      '--excludePatterns',
      excludePattern,
      '--waitTimeScreenshot',
      '500',
      '--concurrency',
      '4',
      '--headless',
      'true',
      '--bailOnStoriesError',
      '--stepsApi',
      'parameters',
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
