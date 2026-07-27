// @ts-check

const path = require('path');

const { registerTsPaths, registerRules, rules, loadWorkspaceAddon } = require('@fluentui/scripts-storybook');
const tsConfigPath = path.resolve(__dirname, '../../../tsconfig.base.json');

/**
 * The one non-module stylesheet that must go through Tailwind (see its header comment).
 * Everything else matching `/\.css$/` keeps storybook's plain style-loader/css-loader chain.
 */
const tailwindThemeEntry = path.resolve(__dirname, 'tailwind-theme.css');

/**
 * `@tailwindcss/postcss` is a *plugin creator*: it has to be invoked to produce the
 * PostCSS plugin object. postcss-loader@4's string/`[name, options]` plugin forms call
 * `require(name)` and return it UNINVOKED when options are empty (dist/utils.js
 * `loadPlugin`), so the instantiated object is passed directly instead.
 */
const tailwindPostcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      // no postcss.config.* exists in this repo — skip cosmiconfig's upward search
      config: false,
      plugins: [require('@tailwindcss/postcss')()],
    },
  },
};

/**
 * Tailwind-flavoured CSS Modules for converted (Griffel-free) packages.
 * `localIdentName` is deterministic and prefixed so the jest snapshot serializer can
 * strip the classes exactly like `@griffel/jest-serializer` strips atomics
 * (migration/griffel-to-tailwind/reports/DECISIONS.md D9).
 *
 * @type {import("webpack").RuleSetRule}
 */
const cssModulesRule = {
  test: /\.module\.css$/,
  sideEffects: true,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: {
          localIdentName: 'fuicm-[name]__[local]--[hash:base64:4]',
          namedExport: false,
        },
      },
    },
    tailwindPostcssLoader,
  ],
};

/**
 * @type {import("webpack").RuleSetRule}
 */
const tailwindThemeRule = {
  test: /\.css$/,
  include: [tailwindThemeEntry],
  sideEffects: true,
  use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, tailwindPostcssLoader],
};

/**
 * Storybook's builder appends an implicit `{ test: /\.css$/, use: [style-loader,
 * css-loader] }` rule (builder-webpack5 `createDefaultWebpackConfig`) with no `modules`
 * option — it would swallow `*.module.css` as global CSS and hand back an empty class
 * map. Narrow it instead of replacing it: unconverted packages still need plain CSS.
 *
 * @param {import("webpack").Configuration} config
 */
function excludeTailwindCssFromDefaultCssRule(config) {
  const cssRuleTest = String(/\.css$/);
  const moduleRules = /** @type {import("webpack").RuleSetRule[]} */ (config.module?.rules ?? []);

  for (const rule of moduleRules) {
    // `rule.include` also guards the rules added below, which share `test: /\.css$/`.
    if (!rule || typeof rule !== 'object' || String(rule.test) !== cssRuleTest || rule.include != null) {
      continue;
    }

    const existingExcludes = rule.exclude == null ? [] : Array.isArray(rule.exclude) ? rule.exclude : [rule.exclude];
    rule.exclude = [...existingExcludes, /\.module\.css$/, tailwindThemeEntry];
  }
}

module.exports = /** @type {import('@storybook/react-webpack5').StorybookConfig} */ ({
  addons: [loadWorkspaceAddon('@fluentui/react-storybook-addon', { tsConfigPath })],
  stories: ['../src/**/*.stories.tsx'],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        lazyCompilation: false,
      },
    },
  },
  typescript: {
    // disable react-docgen-typescript (totally not needed here, slows things down a lot)
    reactDocgen: false,
  },
  webpackFinal(config) {
    registerTsPaths({ config, configFile: tsConfigPath });
    // Narrow storybook's own rule first, then add ours.
    excludeTailwindCssFromDefaultCssRule(config);
    // griffelRule stays: only some packages are converted, the rest still need AOT Griffel.
    registerRules({ config, rules: [rules.swcRule, rules.griffelRule, cssModulesRule, tailwindThemeRule] });

    return config;
  },
});
