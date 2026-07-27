#!/usr/bin/env node
/**
 * Pixel-diff two capture directories (see capture.mjs). Missing/extra files are
 * FAILURES, not noise (baseline identity is name-derived — storybook-vr-infra report).
 *
 * Usage:
 *   node migration/griffel-to-tailwind/validation/diff.mjs \
 *     --baseline <dir> --candidate <dir> [--maxDiffPixels 0] [--threshold 0.1] [--report <dir>]
 *
 * Exit 0 only when every pair is within tolerance and file sets match exactly.
 * Diff PNGs for failing pairs are written to --report (default <candidate>-diff).
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(path.resolve('tools/visual-regression-assert/package.json'));
const { PNG } = require('pngjs');
const pixelmatchMod = require('pixelmatch');
const pixelmatch = pixelmatchMod.default ?? pixelmatchMod;

const args = {};
for (let i = 2; i < process.argv.length; i += 2) {
  args[process.argv[i].replace(/^--/, '')] = process.argv[i + 1];
}
const baseline = args.baseline;
const candidate = args.candidate;
if (!baseline || !candidate) {
  console.error('required: --baseline <dir> --candidate <dir>');
  process.exit(2);
}
const maxDiffPixels = args.maxDiffPixels ? Number(args.maxDiffPixels) : 0;
const threshold = args.threshold ? Number(args.threshold) : 0.1;
const reportDir = args.report ?? `${candidate.replace(/[\\/]+$/, '')}-diff`;

const pngs = dir =>
  fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.png'))
    .sort();

const baseFiles = pngs(baseline);
const candFiles = pngs(candidate);
const baseSet = new Set(baseFiles);
const candSet = new Set(candFiles);

const missing = baseFiles.filter(f => !candSet.has(f)); // story disappeared/renamed
const extra = candFiles.filter(f => !baseSet.has(f)); // unexpected new story
const pairs = baseFiles.filter(f => candSet.has(f));

fs.mkdirSync(reportDir, { recursive: true });
const failed = [];
let identical = 0;

for (const file of pairs) {
  const a = PNG.sync.read(fs.readFileSync(path.join(baseline, file)));
  const b = PNG.sync.read(fs.readFileSync(path.join(candidate, file)));
  if (a.width !== b.width || a.height !== b.height) {
    failed.push({ file, reason: `size ${a.width}x${a.height} vs ${b.width}x${b.height}` });
    continue;
  }
  const diff = new PNG({ width: a.width, height: a.height });
  const n = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold });
  if (n === 0) {
    identical++;
  } else if (n > maxDiffPixels) {
    fs.writeFileSync(path.join(reportDir, file.replace(/\.png$/, '.diff.png')), PNG.sync.write(diff));
    failed.push({ file, reason: `${n} diff pixels (max ${maxDiffPixels})`, diffPixels: n });
  } else {
    identical++; // within tolerance
  }
}

const summary = {
  baseline,
  candidate,
  threshold,
  maxDiffPixels,
  pairs: pairs.length,
  identicalOrWithinTolerance: identical,
  failed,
  missing,
  extra,
  passed: failed.length === 0 && missing.length === 0 && extra.length === 0,
};
fs.writeFileSync(path.join(reportDir, 'summary.json'), JSON.stringify(summary, null, 2));

console.log(`[diff] ${pairs.length} pairs, ${identical} clean, ${failed.length} failed, ${missing.length} missing, ${extra.length} extra`);
for (const f of failed) console.log(`  FAIL ${f.file}: ${f.reason}`);
for (const f of missing) console.log(`  MISSING in candidate: ${f}`);
for (const f of extra) console.log(`  EXTRA in candidate: ${f}`);
console.log(`[diff] ${summary.passed ? 'PASSED' : 'FAILED'} — summary: ${path.join(reportDir, 'summary.json')}`);
process.exit(summary.passed ? 0 : 1);
