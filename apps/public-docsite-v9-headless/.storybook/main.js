const path = require('path');

const rootMain = require('../../../.storybook/main');

const repoRoot = path.resolve(__dirname, '../../..');
const tokensDir = path.resolve(repoRoot, 'bebop');
const headlessStoriesDir = path.resolve(
  repoRoot,
  'packages/react-components/react-headless-components-preview/stories',
);

/**
 * CSS Modules webpack rule for the headless docsite.
 *
 * Storybook's `@storybook/builder-webpack5` ships a default `\.css$` rule that
 * pipes any CSS through `style-loader` + plain `css-loader`. That handles
 * `bebop/tokens.css` correctly. For `*.module.css` files (the per-component
 * design-system styles) we want CSS Modules, so we narrow the default rule to
 * skip `.module.css` and add a dedicated rule that turns on `modules: true`.
 *
 * Scoped via `include` so we only handle CSS coming from the design-system
 * tree and the headless stories tree.
 */
const cssIncludes = [tokensDir, headlessStoriesDir];

const cssModuleRule = {
  test: /\.module\.css$/,
  include: cssIncludes,
  // Skip `?raw` imports — those go through Storybook's `resourceQuery:/raw/`
  // asset/source rule and yield the file's text content. Without this filter,
  // webpack chains style-loader + css-loader on top of asset/source and the
  // story ends up importing the style-loader JS wrapper instead of the CSS.
  resourceQuery: { not: [/raw/] },
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[name]__[local]--[hash:base64:5]',
        },
        importLoaders: 0,
      },
    },
  ],
};

/**
 * Patches existing webpack rules in two ways:
 *   1. Storybook's default `\.css$` rule gets a `\.module\.css$` exclude, so
 *      our CSS Modules rule is the only one that handles `*.module.css`.
 *   2. Any rule whose test matches `.css` or `.tsx?` and that doesn't already
 *      filter on `resourceQuery` is told to skip `?raw` queries. That keeps
 *      Storybook's built-in `resourceQuery:/raw/` asset/source rule as the
 *      sole handler for `import x from 'path?raw'`, which we use to surface
 *      story file source and CSS Module source in the Show-code panel.
 *
 * Returns the input array for chaining.
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
    // Probe with synthetic file paths so we don't have to parse the regex source.
    // Includes `.stories.tsx`/`.stories.ts` shapes because Storybook's
    // export-order-loader and the @fluentui export-to-sandbox addon both add
    // rules that match those and would otherwise re-process `?raw` imports.
    const matchesCssOrTs =
      isRegExp &&
      (test.test('a.css') ||
        test.test('a.tsx') ||
        test.test('a.ts') ||
        test.test('a.stories.tsx') ||
        test.test('a.stories.ts'));
    if (matchesCssOrTs && rule.resourceQuery == null) {
      rule.resourceQuery = { not: [/raw/] };
    }
  }
  return rules;
}

module.exports = /** @type {Omit<import('../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [
    ...rootMain.stories,
    // docsite stories
    '../src/**/*.mdx',
    '../src/**/index.stories.@(ts|tsx)',
    // headless package stories
    '../../../packages/react-components/react-headless-components-preview/stories/src/**/index.stories.@(ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: [...rootMain.addons],
  build: {
    previewUrl: process.env.DEPLOY_PATH,
  },
  webpackFinal: (config, options) => {
    const localConfig = /** @type config */ ({ ...rootMain.webpackFinal(config, options) });

    localConfig.module = localConfig.module || { rules: [] };
    const rules = patchRules([...(localConfig.module.rules || [])]);
    localConfig.module.rules = [cssModuleRule, ...rules];

    return localConfig;
  },
});
