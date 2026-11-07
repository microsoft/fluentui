/**
 * Jest snapshot serializer stripping generated (fuicm-*) class names — they digest the
 * module path, so keeping them would churn snapshots on renames. The group/fui-* marker
 * is public DOM surface and stays. `print` edits in place (targeted String.replace, not
 * split/join): whole-document string snapshots flow through here too, and rebuilding the
 * string would collapse their line structure.
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
