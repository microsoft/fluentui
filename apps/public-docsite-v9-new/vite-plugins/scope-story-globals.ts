import postcss from 'postcss';
import type { Plugin } from 'vite';

const TOKENS_FILE = /react-headless-components-preview[\\/]stories[\\/]\.storybook[\\/]tokens\.css$/;

/** The preview container plays the part the story canvas plays in Storybook. */
const PREVIEW_ROOT = '[data-fluent-preview]';

/** Selectors naming the page itself in Storybook, where the story *is* the page. */
const PAGE_SELECTORS = new Set(['html', 'body', '#root', ':root']);

/**
 * Scopes the headless stories' global element styles to example previews.
 *
 * The stories package styles its examples with CSS Modules that read design tokens from
 * `.storybook/tokens.css`. Alongside those tokens the file carries global element rules —
 * `body`, `a`, `code`, `button`, `select` — which are correct under Storybook, where the story
 * occupies the whole page.
 *
 * Loaded as-is by the documentation site they style the site itself. `body` sets its own
 * background and colour, and being unlayered it outranks the theme in `@layer base`, so every
 * headless page rendered with a white background and near-black text whatever the theme said.
 *
 * Custom properties stay global: the previews inherit them, and confining them to the preview
 * subtree would leave the tokens undefined for anything rendered in a portal.
 */
export function scopeStoryGlobals(): Plugin {
  return {
    name: 'fluentui:scope-story-globals',

    transform(code, id) {
      if (!TOKENS_FILE.test(id)) {
        return null;
      }

      const root = postcss.parse(code);

      root.walkRules(rule => {
        // `:root { --token: … }` and friends define the tokens themselves, which stay global.
        if (rule.parent?.type === 'atrule' && (rule.parent as postcss.AtRule).name === 'keyframes') {
          return;
        }

        rule.selectors = rule.selectors.map(selector => {
          const trimmed = selector.trim();

          if (trimmed.startsWith(PREVIEW_ROOT) || trimmed === ':root' || trimmed.startsWith(':root')) {
            return selector;
          }

          // `html`, `body` and `#root` name the page; the preview stands in for it.
          if (PAGE_SELECTORS.has(trimmed)) {
            return PREVIEW_ROOT;
          }

          return `${PREVIEW_ROOT} ${trimmed}`;
        });
      });

      // Selector rewriting can leave a rule addressing the preview root twice over.
      root.walkRules(rule => {
        rule.selectors = [...new Set(rule.selectors)];
      });

      return { code: root.toString(), map: null };
    },
  };
}
