// @ts-check

const path = require('path');

const { registerTsPaths, registerRules, rules, loadWorkspaceAddon } = require('@fluentui/scripts-storybook');
const tsConfigPath = path.resolve(__dirname, '../../../tsconfig.base.json');

/**
 * Shared with the package build (`postcss-modules` `generateScopedName`) and with jest — one
 * scheme, three pipelines. Required by relative path for the reasons in that file's header.
 */
const { getLocalIdent } = require('../../../scripts/css-modules/ident');
const globalizeGroupMarkers = require('../../../scripts/css-modules/globalize-group-markers');

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
      plugins: [
        require('@tailwindcss/postcss')(),
        /**
         * MUST come after Tailwind and before css-loader's CSS-Modules pass. webpack runs
         * loaders right-to-left, so postcss-loader is already ahead of css-loader; within
         * this list Tailwind has to have emitted `.group\/fui-switch` first.
         *
         * Without it css-loader hashes the marker and every named-group rule compiles to a
         * selector the DOM never matches — silently, with VR still green. See
         * scripts/css-modules/globalize-group-markers.js and DECISIONS.md D15.
         */
        globalizeGroupMarkers(),
      ],
    },
  },
};

/**
 * Tailwind-flavoured CSS Modules for converted (Griffel-free) packages.
 *
 * Class names come from `getLocalIdent` rather than a `localIdentName` template, because the
 * scheme (`fuicm-<component>-<local>-<hex6>`, all lowercase) is not expressible as one: it
 * kebab-cases both the file token and the local, and it hashes the package name + the
 * source-relative path + the local rather than the file's contents. The identical function
 * drives `postcss-modules` in the package build, so the storybook and `dist/styles.css`
 * produce byte-identical class names for the same module — see scripts/css-modules/ident.js.
 *
 * The `fuicm-` prefix is a hard contract with the jest snapshot serializer, which strips
 * these exactly like `@griffel/jest-serializer` strips atomics
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
          getLocalIdent,
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
