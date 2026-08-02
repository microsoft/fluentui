/**
 * Jest snapshot serializer that strips generated CSS-Modules class names.
 *
 * Counterpart to Griffel's retired jest serializer: converted components render
 * `class="group/fui-divider fui-Divider fuicm-divider-root-a3f2c1"`, and only the stable,
 * public tokens belong in a snapshot. Generated names carry a digest over the package name,
 * the source-relative path and the local (webpack and the package build:
 * `fuicm-<component>-<local>-<hex6>`; jest: `fuicm-<local>` from ./proxy.js — see
 * scripts/css-modules/ident.js), so snapshots that kept them would churn whenever a module
 * is renamed or moved.
 *
 * NOT stripped, deliberately: the `group/fui-*` named-group marker. It is unhashed by
 * construction (that is the entire point — DECISIONS.md D15) and it is public DOM surface,
 * so it belongs in the snapshot exactly the way `fui-Divider` does. Extending the match to
 * hide it would hide a public contract.
 *
 * pretty-format hands each attribute value to the registered plugins as a string, which
 * is why `test`/`print` operate on strings rather than DOM nodes — same contract as
 * Griffel's jest serializer (removed from the repo in the S-J closing batch).
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
