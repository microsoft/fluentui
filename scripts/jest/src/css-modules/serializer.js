/**
 * Jest snapshot serializer that strips generated CSS-Modules class names.
 *
 * Counterpart to `@griffel/jest-serializer`: converted components render
 * `class="fui-Divider fuicm-Divider__root--AbC1"`, and only the stable, public
 * `fui-*` classes belong in a snapshot. Generated names change whenever the CSS file
 * changes (webpack: `fuicm-[name]__[local]--[hash:base64:4]`; jest: `fuicm-<key>` from
 * ./proxy.js), so snapshots that kept them would churn on every style edit.
 *
 * pretty-format hands each attribute value to the registered plugins as a string, which
 * is why `test`/`print` operate on strings rather than DOM nodes — same contract as
 * `@griffel/jest-serializer` (node_modules/@griffel/jest-serializer/src/index.js).
 *
 * See migration/griffel-to-tailwind/reports/DECISIONS.md D9.
 */

const GENERATED_CLASS_PREFIX = 'fuicm-';

/**
 * @param {unknown} val
 */
function isGeneratedClassName(val) {
  return typeof val === 'string' && val.startsWith(GENERATED_CLASS_PREFIX);
}

/**
 * @param {unknown} val
 */
function test(val) {
  return typeof val === 'string' && val.split(/\s+/).some(isGeneratedClassName);
}

/**
 * @param {string} val
 */
function print(val) {
  const kept = val
    .split(/\s+/)
    .filter(token => token.length > 0 && !isGeneratedClassName(token))
    .join(' ');

  return `"${kept}"`;
}

module.exports = { test, print };
