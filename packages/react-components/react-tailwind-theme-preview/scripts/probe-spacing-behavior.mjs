// @ts-check
/**
 * Behavior probes for the spacing token structure. Loads the REAL compiled theme artifact (dist/styles.css) plus
 * utilities compiled from the real css/index.css into headless Chromium and asserts
 * computed styles — jsdom cannot resolve var()/calc() chains, so this is a browser test
 * by necessity.
 *
 * A. DENSITY KNOB — overriding `--spacing` on a subtree rescales a numeric utility
 *    (p-12) and a named-token utility (p-horizontal-m) IDENTICALLY. This is the property
 *    the numeric-axis alias structure buys; it was RED under the previous literal
 *    `calc(12px * var(--base-scale))` registration (named utilities ignored --spacing).
 * B. CANONICAL READS — the strings the `tokens.*` JS constants now carry
 *    (`var(--spacing-horizontal-m)`, `var(--stroke-width-thin)`) resolve outside any
 *    FluentProvider; the private hook `var(--spacing-thin)` (sanctioned module authoring
 *    for border/outline widths) resolves identically to the canonical.
 * C. STROKE DECOUPLING — `var(--stroke-width-thin)` / `var(--spacing-thin)` do NOT
 *    respond to a `--spacing` override: borders must not thin when layout density
 *    changes (deliberate design exception).
 * D. OLD NAMES ARE GONE — `var(--spacingHorizontalM)` /
 *    `var(--strokeWidthThin)` do NOT resolve anywhere in the emitted CSS.
 * E. DEFAULT ARITHMETIC — at a 16px root everything computes to the canonical px.
 *
 * Run: node packages/react-components/react-tailwind-theme-preview/scripts/probe-spacing-behavior.mjs
 * Requires dist/styles.css (run `node build.js` in this package first).
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = path.resolve(PACKAGE_ROOT, '..', '..', '..');
const require_ = createRequire(path.join(REPO_ROOT, 'package.json'));

const DIST = path.join(PACKAGE_ROOT, 'dist', 'styles.css');
if (!fs.existsSync(DIST)) {
  console.error('[probe-spacing-behavior] dist/styles.css missing — run `node build.js` first.');
  process.exit(2);
}

async function compileUtilities() {
  const postcss = require_('postcss');
  const tailwind = require_('@tailwindcss/postcss');
  const html = '<div class="p-12 p-horizontal-m p-24 p-horizontal-xxl w-thin"></div>';
  const probeHtml = path.join(PACKAGE_ROOT, 'dist', 'probe-spacing-behavior.html');
  fs.writeFileSync(probeHtml, html);
  const entryPath = path.join(PACKAGE_ROOT, 'dist', 'probe-spacing-behavior.entry.css');
  const entry = `@import '${path
    .join(PACKAGE_ROOT, 'css', 'index.css')
    .replace(/\\/g, '/')}' source(none);\n@source './probe-spacing-behavior.html';\n`;
  fs.writeFileSync(entryPath, entry);
  const result = await postcss([tailwind()]).process(entry, { from: entryPath });
  fs.rmSync(probeHtml);
  fs.rmSync(entryPath);
  return result.css;
}

const utilitiesCss = await compileUtilities();
const themeCss = fs.readFileSync(DIST, 'utf8');

// Option B removal — hard assertion at the artifact level before the browser even opens.
const OLD_NAME = /--spacingHorizontal|--spacingVertical|--strokeWidth(Thin|Thick|Thicker|Thickest)/;
if (OLD_NAME.test(themeCss) || OLD_NAME.test(utilitiesCss)) {
  console.error('[probe-spacing-behavior] FAIL: old camelCase token names found in emitted CSS.');
  process.exit(1);
}

const PAGE = `<!doctype html><html><head>
<style>${themeCss}</style>
<style>${utilitiesCss}</style>
</head><body>
  <!-- default-density context -->
  <div id="numeric" class="p-12"></div>
  <div id="named" class="p-horizontal-m"></div>
  <div id="tokens-spacing" style="padding: var(--spacing-horizontal-m)"></div>
  <div id="tokens-stroke" style="border-top: solid; border-top-width: var(--stroke-width-thin)"></div>
  <div id="hook-stroke" style="border-top: solid; border-top-width: var(--spacing-thin)"></div>
  <div id="util-stroke" class="w-thin"></div>
  <div id="old-spacing" style="padding: var(--spacingHorizontalM)"></div>
  <div id="old-stroke" style="border-top: solid; border-top-width: var(--strokeWidthThin)"></div>
  <!-- doubled-density subtree: the single knob -->
  <div id="dense" style="--spacing: calc(2px * var(--base-scale))">
    <div id="dense-numeric" class="p-12"></div>
    <div id="dense-named" class="p-horizontal-m"></div>
    <div id="dense-numeric-24" class="p-24"></div>
    <div id="dense-named-xxl" class="p-horizontal-xxl"></div>
    <div id="dense-stroke" style="border-top: solid; border-top-width: var(--stroke-width-thin)"></div>
    <div id="dense-hook" style="border-top: solid; border-top-width: var(--spacing-thin)"></div>
  </div>
</body></html>`;

const { chromium } = require_('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(PAGE);

/** @param {string} id @param {string} prop */
const computed = (id, prop) =>
  page.evaluate(
    ([i, p]) => getComputedStyle(/** @type {Element} */ (document.getElementById(i))).getPropertyValue(p),
    [id, prop],
  );

let failures = 0;
/** @param {string} label @param {unknown} actual @param {unknown} expected */
function assertEq(label, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${label} — got \`${actual}\`${ok ? '' : ` expected \`${expected}\``}`);
  if (!ok) failures++;
}

// E. Default arithmetic — canonical px at a 16px root.
assertEq('default: .p-12 padding-top', await computed('numeric', 'padding-top'), '12px');
assertEq('default: .p-horizontal-m padding-top', await computed('named', 'padding-top'), '12px');

// B. Canonical reads at :root scope (no FluentProvider on this page) — the exact strings
// the repointed tokens.* constants carry, plus the private hook and the utility form.
assertEq('tokens.*: var(--spacing-horizontal-m) padding-top', await computed('tokens-spacing', 'padding-top'), '12px');
assertEq(
  'tokens.*: var(--stroke-width-thin) border-top-width',
  await computed('tokens-stroke', 'border-top-width'),
  '1px',
);
assertEq('hook: var(--spacing-thin) border-top-width', await computed('hook-stroke', 'border-top-width'), '1px');
assertEq('utility: .w-thin width', await computed('util-stroke', 'width'), '1px');

// D. Old names are gone — unresolved var() → padding falls to its 0 initial; the
// old-name border must NOT compute to the canonical 1px.
assertEq('removed: var(--spacingHorizontalM) padding-top', await computed('old-spacing', 'padding-top'), '0px');
const oldStroke = await computed('old-stroke', 'border-top-width');
{
  const ok = oldStroke !== '1px';
  console.log(
    `${ok ? 'PASS' : 'FAIL'}: removed: var(--strokeWidthThin) border-top-width does not resolve — got \`${oldStroke}\``,
  );
  if (!ok) failures++;
}

// A. Density knob — subtree --spacing override doubles BOTH forms identically.
assertEq('dense: .p-12 padding-top', await computed('dense-numeric', 'padding-top'), '24px');
assertEq('dense: .p-horizontal-m padding-top', await computed('dense-named', 'padding-top'), '24px');
assertEq(
  'dense: numeric === named response',
  await computed('dense-numeric', 'padding-top'),
  await computed('dense-named', 'padding-top'),
);
assertEq('dense: .p-24 padding-top', await computed('dense-numeric-24', 'padding-top'), '48px');
assertEq('dense: .p-horizontal-xxl padding-top', await computed('dense-named-xxl', 'padding-top'), '48px');

// C. Stroke decoupling — the SAME subtree override must NOT thin/thicken borders.
assertEq(
  'dense: var(--stroke-width-thin) border-top-width unchanged',
  await computed('dense-stroke', 'border-top-width'),
  '1px',
);
assertEq(
  'dense: var(--spacing-thin) border-top-width unchanged',
  await computed('dense-hook', 'border-top-width'),
  '1px',
);

await browser.close();
console.log(failures === 0 ? '[probe-spacing-behavior] ALL PASS' : `[probe-spacing-behavior] ${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
