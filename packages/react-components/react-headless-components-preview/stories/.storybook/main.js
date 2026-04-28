const path = require('path');

const rootMain = require('../../../../../.storybook/main');

const repoRoot = path.resolve(__dirname, '../../../../..');
const tokensDir = path.resolve(repoRoot, 'bebop');
const headlessStoriesDir = path.resolve(__dirname, '..');

/**
 * CSS Modules webpack rule for the per-package storybook. Mirrors the docsite
 * at apps/public-docsite-v9-headless/.storybook/main.js — see that file for
 * the design rationale (default Storybook rule handles plain CSS; we narrow
 * it to skip `.module.css` and add a CSS-Modules rule).
 */
const cssIncludes = [tokensDir, headlessStoriesDir];

const cssModuleRule = {
  test: /\.module\.css$/,
  include: cssIncludes,
  // Skip `?raw` imports — see the docsite at
  // apps/public-docsite-v9-headless/.storybook/main.js for the rationale.
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
 * Mirrors `patchRules` in the docsite config — see that file's comment for
 * the full rationale (CSS Modules carve-out + `?raw` resourceQuery skip).
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
      rule.resourceQuery = { not: [/raw/] };
    }
  }
  return rules;
}

module.exports = /** @type {Omit<import('../../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [...rootMain.stories, '../src/**/*.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: [...rootMain.addons],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };

    localConfig.module = localConfig.module || { rules: [] };
    const rules = patchRules([...(localConfig.module.rules || [])]);
    localConfig.module.rules = [cssModuleRule, ...rules];

    return localConfig;
  },
});
