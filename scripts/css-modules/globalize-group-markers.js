// @ts-check
/**
 * PostCSS plugin wrapping Tailwind named-group/peer markers (.group/name, .peer/name)
 * in :global() BEFORE postcss-modules runs, so the marker class survives as authored
 * instead of being hashed — a hashed marker compiles to a selector the DOM never matches,
 * with no error. Must run between tailwindcss() and postcssModules() in every pipeline;
 * the build asserts no marker leaks into a class map.
 * Prior art: @accelint/postcss-tailwind-css-modules does the same transform.
 */

/**
 * `.group\/<name>` or `.peer\/<name>` — the ESCAPED SLASH is what Tailwind emits, because
 * `/` is not legal in a bare class selector. `\\\/` in this literal is one backslash
 * followed by one forward slash in the selector text.
 *
 * `peer/…` (the sibling analogue) has no component using it today; it is covered here so the
 * infrastructure does not need revisiting when one does.
 */
const GROUP_OR_PEER_MARKER = /\.((?:group|peer)\\\/[a-zA-Z0-9_-]+)/g;

/** What an already-wrapped marker looks like, so the pass is idempotent. */
const GLOBAL_WRAPPER_OPEN = ':global(';

const postcssPlugin = 'fui-globalize-group-markers';

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
 * @param {{ onRewrite?: (info: { from: string, to: string, count: number }) => void }} [options]
 */
function globalizeGroupMarkers(options = {}) {
  return {
    postcssPlugin,
    /**
     * @param {import('postcss').Rule} rule
     */
    Rule(rule) {
      if (!rule.selector.includes('\\/')) {
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
