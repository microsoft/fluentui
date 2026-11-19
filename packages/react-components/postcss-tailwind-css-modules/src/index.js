// @ts-check
/**
 * PostCSS plugin wrapping Tailwind named-group/peer markers (.group/name, .peer/name)
 * in :global() BEFORE postcss-modules runs, so the marker class survives as authored
 * instead of being hashed — a hashed marker compiles to a selector the DOM never matches,
 * with no error. Must run between tailwindcss() and postcssModules() in every pipeline.
 */

/**
 * `.group\/<name>` or `.peer\/<name>` — the ESCAPED SLASH is what Tailwind emits, because
 * `/` is not legal in a bare class selector. `\\\/` in this literal is one backslash
 * followed by one forward slash in the selector text.
 *
 * `peer/…` (the sibling analogue) is covered alongside `group/…` so a pipeline never needs
 * revisiting when a component starts using it.
 */
const GROUP_OR_PEER_MARKER = /\.((?:group|peer)\\\/[a-zA-Z0-9_-]+)/g;

/** What an already-wrapped marker looks like, so the pass is idempotent. */
const GLOBAL_WRAPPER_OPEN = ':global(';

/** Default `include`: only files whose PostCSS `source.input.file` ends in `.module.css`. */
const DEFAULT_INCLUDE = /\.module\.css$/;

const postcssPlugin = '@fluentui/postcss-tailwind-css-modules';

/**
 * @param {string} selector
 * @returns {{ selector: string, rewrites: number }}
 */
function globalizeSelector(selector) {
  let rewrites = 0;

  GROUP_OR_PEER_MARKER.lastIndex = 0;

  const next = selector.replace(GROUP_OR_PEER_MARKER, (match, marker, offset) => {
    // Idempotence: a marker already sitting directly inside `:global(` is left alone, so
    // running the plugin twice (or over hand-authored `:global(.group\/x)`) is a no-op.
    if (selector.slice(Math.max(0, offset - GLOBAL_WRAPPER_OPEN.length), offset) === GLOBAL_WRAPPER_OPEN) {
      return match;
    }

    rewrites++;
    return `${GLOBAL_WRAPPER_OPEN}.${marker})`;
  });

  return { selector: next, rewrites };
}

/**
 * Whether a rule's root should be rewritten, per the `include` option.
 *
 * When `source.input.file` is undefined — e.g. `postcss.process(css)` called with no `from`
 * — the file matches only when `include: true` disables filtering entirely. This is the
 * conservative default: with no filename to test, silently rewriting every rule regardless of
 * whether it belongs to a CSS Modules file would be surprising for a plain-CSS pipeline that
 * never set `from`. Pass `from`, or pass `include: true`, to opt in.
 *
 * @param {string | undefined} file
 * @param {Required<Options>['include']} include
 * @returns {boolean}
 */
function shouldInclude(file, include) {
  if (include === true) {
    return true;
  }

  if (file === undefined) {
    return false;
  }

  return typeof include === 'function' ? include(file) : include.test(file);
}

/**
 * @typedef {object} Options
 * @property {RegExp | ((file: string) => boolean) | true} [include] Which files to rewrite,
 *   tested against the root's `source.input.file`. Defaults to `/\.module\.css$/`. Pass `true`
 *   to rewrite every rule regardless of filename (required when `source.input.file` is
 *   undefined, e.g. no `from` was given to `postcss.process`).
 * @property {(info: { from: string, to: string, count: number }) => void} [onRewrite] Called once
 *   per rewritten rule.
 */

/**
 * @param {Options} [options]
 */
function globalizeGroupMarkers(options = {}) {
  const include = options.include ?? DEFAULT_INCLUDE;

  return {
    postcssPlugin,
    /**
     * @param {import('postcss').Rule} rule
     */
    Rule(rule) {
      if (!rule.selector.includes('\\/')) {
        return;
      }

      const file = rule.root().source?.input.file;

      if (!shouldInclude(file, include)) {
        return;
      }

      const { selector, rewrites } = globalizeSelector(rule.selector);

      if (rewrites === 0) {
        return;
      }

      options.onRewrite?.({ from: rule.selector, to: selector, count: rewrites });
      rule.selector = selector;
    },
  };
}

globalizeGroupMarkers.postcss = true;

module.exports = globalizeGroupMarkers;
module.exports.globalizeGroupMarkers = globalizeGroupMarkers;
module.exports.globalizeSelector = globalizeSelector;
module.exports.GROUP_OR_PEER_MARKER = GROUP_OR_PEER_MARKER;
module.exports.postcssPlugin = postcssPlugin;
