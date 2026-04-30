/**
 * Shared CSS-Modules + `?raw` webpack wiring for the headless stories.
 *
 * Source of truth lives here (in the stories package). The app at
 * `apps/public-docsite-v9-headless/.storybook/main.js` consumes it via require.
 *
 * Storybook's `@storybook/builder-webpack5` ships a default `\.css$` rule that
 * pipes any CSS through `style-loader` + plain `css-loader`. That handles
 * `theme/tokens.css` correctly. For `*.module.css` files (the per-component
 * design-system styles) we want CSS Modules, so we narrow the default rule to
 * skip `.module.css` and add a dedicated rule that turns on `modules: true`.
 *
 * `?raw` imports must go through Storybook's built-in `resourceQuery:/raw/`
 * asset/source rule. We mark our CSS-Modules rule (and any default rule that
 * would otherwise re-process `?raw` imports) with `resourceQuery: { not: [/raw/] }`
 * so the asset/source rule wins.
 */
const path = require('path');

const RAW_QUERY_NOT = { not: [/raw/] };

/**
 * @param {{ tokensDir: string; headlessStoriesDir: string }} options
 */
function createCssModuleRule({ tokensDir, headlessStoriesDir }) {
  return {
    test: /\.module\.css$/,
    include: [tokensDir, headlessStoriesDir],
    resourceQuery: RAW_QUERY_NOT,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: { localIdentName: '[name]__[local]--[hash:base64:5]' },
          importLoaders: 0,
        },
      },
    ],
  };
}

/**
 * Mutates rule entries in place:
 *   1. Storybook's default `\.css$` rule gets a `\.module\.css$` exclude.
 *   2. Any rule whose test matches `.css`/`.tsx?` and has no `resourceQuery`
 *      filter is told to skip `?raw` queries — including `.stories.tsx?` shapes
 *      so the export-order-loader and the @fluentui export-to-sandbox addon
 *      don't re-process raw imports.
 *
 * @param {any[]} rules
 */
function patchRules(rules) {
  for (const rule of rules) {
    if (!rule || typeof rule !== 'object') continue;
    const test = rule.test;
    const isRegExp = test instanceof RegExp;
    const matchesPlainCss = isRegExp && test.source === /\.css$/.source;
    if (matchesPlainCss) {
      const existing = rule.exclude;
      const moduleRegex = /\.module\.css$/;
      if (Array.isArray(existing)) {
        rule.exclude = [...existing, moduleRegex];
      } else if (existing) {
        rule.exclude = [existing, moduleRegex];
      } else {
        rule.exclude = moduleRegex;
      }
    }
    const matchesCssOrTs =
      isRegExp &&
      (test.test('a.css') ||
        test.test('a.tsx') ||
        test.test('a.ts') ||
        test.test('a.stories.tsx') ||
        test.test('a.stories.ts'));
    if (matchesCssOrTs && rule.resourceQuery == null) {
      rule.resourceQuery = RAW_QUERY_NOT;
    }
  }
  return rules;
}

const STORIES_PACKAGE_ROOT = path.resolve(__dirname, '..');

module.exports = {
  STORIES_PACKAGE_ROOT,
  createCssModuleRule,
  patchRules,
};
