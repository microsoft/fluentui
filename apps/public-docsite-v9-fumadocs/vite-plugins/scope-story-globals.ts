import postcss from 'postcss';
import type { Plugin } from 'vite';

const TOKENS_FILE = /react-headless-components-preview[\\/]stories[\\/]\.storybook[\\/]tokens\.css$/;

const PREVIEW_ROOT = '[data-fluent-preview]';
const PREVIEW_SCOPE = `:where(${PREVIEW_ROOT})`;
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
 * Custom properties stay global for portals, except font-family tokens shared with Tailwind.
 * Those belong to the preview; otherwise loading a Headless page changes the docs shell font.
 * The scope adds no specificity, so story CSS Modules still override element defaults.
 */
export function scopeStoryGlobals(): Plugin {
  return {
    name: 'fluentui:scope-story-globals',

    transform(code, id) {
      if (!TOKENS_FILE.test(id)) {
        return null;
      }

      const root = postcss.parse(code);

      root.walkRules(':root', rule => {
        const fonts = postcss.rule({ selector: PREVIEW_SCOPE });
        rule.walkDecls(/^--font-(sans|mono|display)$/, declaration => {
          fonts.append(declaration.clone());
          declaration.remove();
        });
        if (fonts.nodes.length) {
          rule.after(fonts);
        }
      });

      root.walkRules(rule => {
        if (rule.parent?.type === 'atrule' && (rule.parent as postcss.AtRule).name === 'keyframes') {
          return;
        }

        rule.selectors = rule.selectors.map(selector => {
          const trimmed = selector.trim();

          if (trimmed.startsWith(PREVIEW_SCOPE) || trimmed.startsWith(PREVIEW_ROOT) || trimmed.startsWith(':root')) {
            return selector;
          }

          // `html`, `body` and `#root` name the page; the preview stands in for it.
          if (PAGE_SELECTORS.has(trimmed)) {
            return PREVIEW_SCOPE;
          }

          return `${PREVIEW_SCOPE} ${trimmed}`;
        });
      });

      root.walkRules(rule => {
        rule.selectors = [...new Set(rule.selectors)];
      });

      return { code: root.toString(), map: null };
    },
  };
}
