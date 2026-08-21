// @ts-check
/**
 * PostCSS plugin — keep Tailwind named-group / named-peer markers OUT of CSS-Modules hashing.
 *
 * ── The failure it fixes (DECISIONS.md D15, reports/named-groups-design.md §2.4) ──────────
 *
 * A named group is written in JSX as a literal, unhashed string:
 *
 *     clsx('group/fui-switch', switchClassNames.root, styles.root, state.root.className)
 *
 * and read from another module — possibly in another package — as
 *
 *     @variant group-checked/fui-switch { … }
 *
 * which Tailwind compiles to a selector containing `.group\/fui-switch`.
 *
 * Both `postcss-modules` and `css-loader` scope EVERY class selector in a `*.module.css`
 * file, and they cannot tell this one apart from a real local. Without this plugin the
 * compiled selector becomes `.fuicm-switch-group-fui-switch-xxxxxx`, which nothing in the
 * DOM ever matches. There is no error and no warning: the rules simply never apply, VR
 * passes because nothing changed visually, and the feature silently does not exist. That is
 * why this is a blocking prerequisite for the marker rollout rather than a nicety.
 *
 * ── The fix ─────────────────────────────────────────────────────────────────────────────
 *
 * Wrap the marker segment in `:global(…)`, which BOTH CSS-Modules implementations honour and
 * strip, leaving the class unscoped and out of the exported class map:
 *
 *     .fuicm-switch-thumb-xxxxxx:is(:where(.group\/fui-switch):where([data-checked]) *)
 *              ↑ still scoped                        ↑ untouched, matches the JSX literal
 *
 * ── Where it runs ───────────────────────────────────────────────────────────────────────
 *
 *   - package build: BETWEEN `tailwindcss()` and `postcssModules()`
 *     (tools/workspace-plugin/src/executors/build/lib/css-modules.ts) — Tailwind must have
 *     emitted the selector before this can rewrite it, and CSS Modules must see the
 *     `:global()` before it scopes.
 *   - VR storybook: appended to `postcssOptions.plugins`
 *     (apps/vr-tests-react-components/.storybook/main.js). webpack runs loaders
 *     right-to-left, so postcss-loader already runs before css-loader.
 *
 * Prior art: nyt-games uses `@accelint/postcss-tailwind-css-modules@1.1.0` for exactly this.
 * A local plugin is preferred over adding a third-party runtime dependency to the build of a
 * Microsoft-shipped library.
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
