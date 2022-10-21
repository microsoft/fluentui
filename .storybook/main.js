const path = require('path'); 
const fs = require('fs');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const exportToCodesandboxAddon = require('storybook-addon-export-to-codesandbox');

const { loadWorkspaceAddon, getCodesandboxBabelOptions } = require('../scripts/storybook');

/**
 * @typedef {import('@storybook/core-common').StorybookConfig} StorybookBaseConfig
 *
 * @typedef {{
 *   babel: (options: Record<string, unknown>) => Promise<Record<string, unknown>>;
 *   previewHead: (head: string) => string;
 * }} StorybookExtraConfig
 *
 * @typedef {StorybookBaseConfig &
 *   Required<Pick<StorybookBaseConfig, 'stories' | 'addons' | 'webpackFinal'>> &
 *   StorybookExtraConfig
 * } StorybookConfig
 */

/**
 * @typedef  {{loader: string; options: { [index: string]: any }}} LoaderObjectDef
 */

/**
 * @typedef {import('@babel/core').TransformOptions & Partial<{customize: string | null}>} BabelLoaderOptions
 */

const previewHeadTemplate = fs.readFileSync(path.resolve(__dirname, 'preview-head-template.html'), 'utf8');

module.exports = /** @type {Omit<StorybookConfig,'typescript'|'babel'>} */ ({
  features: {
    // Enables code splitting
    storyStoreV7: true,
  },
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-knobs/preset',
    'storybook-addon-performance',

    // external custom addons

    /**  @see https://github.com/microsoft/fluentui-storybook-addons */
    'storybook-addon-export-to-codesandbox',

    // internal monorepo custom addons

    /**  @see ../packages/react-components/react-storybook-addon */
    loadWorkspaceAddon('@fluentui/react-storybook-addon'),
  ],
  webpackFinal: config => {
    const tsPaths = new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../tsconfig.base.json'),
    });

    if (config.resolve) {
      config.resolve.plugins ? config.resolve.plugins.push(tsPaths) : (config.resolve.plugins = [tsPaths]);
    }

    if (config.module && config.module.rules) {
      /**
       * @type {import("webpack").RuleSetRule}
       */
      const codesandboxRule = {
        /**
         * why the usage of 'post' ? - we need to run this loader after all storybook webpack rules/loaders have been executed.
         * while we can use Array.prototype.unshift to "override" the indexes this approach is more declarative without additional hacks.
         */
        enforce: 'post',
        test: /\.stories\.tsx$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: processBabelLoaderOptions({
            plugins: [[exportToCodesandboxAddon.babelPlugin, getCodesandboxBabelOptions()]],
          }),
        },
      };

      config.module.rules.push(codesandboxRule);

      overrideDefaultBabelLoader(/** @type {import("webpack").RuleSetRule[]} */ (config.module.rules));
    }

    if ((process.env.CI || process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME) && config.plugins) {
      // Disable ProgressPlugin in PR/CI builds to reduce log verbosity (warnings and errors are still logged)
      config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== 'ProgressPlugin');
    }

    return config;
  },
  core: {
    builder: 'webpack5',
    lazyCompilation: true,
  },
  /**
   * Programmatically enhance previewHead as inheriting just static file `preview-head.html` doesn't work in monorepo
   * @see https://storybook.js.org/docs/react/addons/writing-presets#previewmanager-templates
   */
  previewHead: head => head + previewHeadTemplate,
});

/**
 * Adds custom config to any `babel-loader` usage. Needs to be used on all manually added rules with babel-loader to webpack configuration.
 *
 * Why is this needed:
 *  - `options.babelrc` is ignored by `babel-loader` thus we need to use `customize` api to exclude specific babel presets/plugins
 *
 * @param {BabelLoaderOptions} loaderConfig
 */
function processBabelLoaderOptions(loaderConfig) {
  const customLoaderPath = path.resolve(__dirname, './custom-loader.js');
  const customOptions = { customize: customLoaderPath };
  Object.assign(loaderConfig, customOptions);

  return loaderConfig;
}

/**
 * Overrides storybooks babel-loader setup
 *
 * We might remove this once we'll came up with robust solution (or proper behaviors will be added to babel-loader). For more context @see https://github.com/microsoft/fluentui/issues/18775
 *
 * Note:
 * - this function mutates `rules` argument which is a reference to `modules.rules` webpack config property
 * - to print used babel-loader config run: `yarn start-storybook --no-manager-cache --debug-webpack` and look for
 * webpack rule set containing both:
 *  - `test: /\.(mjs|tsx?|jsx?)$/`
 *  - `node_modules/babel-loader/lib/index.js` as `loader` within module.rules
 *
 * @param {import("webpack").RuleSetRule[]} rules
 */
function overrideDefaultBabelLoader(rules) {
  const loader = getBabelLoader();
  processBabelLoaderOptions(loader.options);

  function getBabelLoader() {
    const ruleIdx = rules.findIndex(rule => {
      return String(/** @type {import("webpack").RuleSetRule}*/ (rule).test) === '/\\.(mjs|tsx?|jsx?)$/';
    });

    const rule = /** @type {import("webpack").RuleSetRule}*/ (rules[ruleIdx]);

    if (!Array.isArray(rule.use)) {
      throw new Error('storybook webpack rules changed');
    }

    const loaderIdx = rule.use.findIndex(loaderConfig => {
      return /** @type {LoaderObjectDef} */ (loaderConfig).loader.includes('babel-loader');
    });

    const loader = /** @type {LoaderObjectDef}*/ (rule.use[loaderIdx]);

    if (!Object.prototype.hasOwnProperty.call(loader, 'options')) {
      throw new Error('storybook webpack #module.rules changed!');
    }

    return loader;
  }
}
