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
 * IMPORTANT — why `print` edits in place instead of split/join:
 * pretty-format offers a plugin every string in the tree, not just class attributes. A
 * test that snapshots a whole HTML *document string* (react-provider's
 * `FluentProvider-node.test.tsx` / `-hydrate.test.tsx` do exactly this) hands the entire
 * multi-line markup to this plugin because one class inside it is generated. Rebuilding
 * that string with `split(/\s+/).join(' ')` silently collapsed every newline and indent.
 * The algorithm below is therefore the same shape as Griffel's: a targeted
 * `String.replace` for the generated tokens, one whole-string `trim()`, then a trim of
 * the *inside* of any `class="…"` / `className="…"` value. All other whitespace — and
 * therefore the snapshot's line structure — is preserved byte for byte.
 *
 * KNOWN LIMITATION: pretty-format uses the first plugin whose `test()` passes. In a
 * whole-HTML-string snapshot containing BOTH generated CSS-Modules classes and Griffel
 * atomics, this plugin wins and the Griffel atomics are left in place. DOM-node snapshots
 * are unaffected (each attribute value is offered to the plugins separately), which is
 * what every converted package uses.
 *
 * See migration/griffel-to-tailwind/reports/DECISIONS.md D9.
 */

const GENERATED_CLASS_PREFIX = 'fuicm-';

/**
 * A generated class token: the prefix plus every following character that can legally be
 * part of a class name in this position. Stops at whitespace and at either quote so the
 * match can never run past the end of an attribute value.
 */
const GENERATED_CLASS_TOKEN = new RegExp(`${GENERATED_CLASS_PREFIX}[^\\s"']*\\s?`, 'g');

/** `class="…"` / `className="…"` — `[^"]*` keeps the match inside a single attribute. */
const CLASS_ATTRIBUTE = /(?:class|className)="([^"]*)"/g;

/**
 * @param {unknown} val
 */
function test(val) {
  return typeof val === 'string' && val.includes(GENERATED_CLASS_PREFIX);
}

/**
 * @param {string} val
 */
function print(val) {
  const stripped = val.replace(GENERATED_CLASS_TOKEN, '').trim();
  const tidied = stripped.replace(CLASS_ATTRIBUTE, (match, value) => match.replace(value, value.trim()));

  return `"${tidied}"`;
}

module.exports = { test, print };
