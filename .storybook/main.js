const path = require('path');
const fs = require('fs');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { getAllPackageInfo, isConvergedPackage } = require('@fluentui/scripts/monorepo');
const semver = require('semver');

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
    '@fluentui/react-storybook-addon',
  ],
  webpackFinal: config => {
    const tsPaths = new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../tsconfig.base.json'),
    });

    if (config.resolve) {
      config.resolve.plugins ? config.resolve.plugins.push(tsPaths) : (config.resolve.plugins = [tsPaths]);
    }

    if (config.module && config.module.rules) {
      overrideDefaultBabelLoader(/** @type {import("webpack").RuleSetRule[]} */ (config.module.rules));

      config.module.rules.unshift({
        test: /\.stories\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [[require('storybook-addon-export-to-codesandbox').babelPlugin, getCodesandboxBabelOptions()]],
          },
        },
      });
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
 * This is a temporary quick-fix solution. Remove this once we'll came up with robust solution - @see https://github.com/microsoft/fluentui/issues/18775
 *
 * Note: this function mutates rules argument
 *
 * @param {import("webpack").RuleSetRule[]} rules
 */
function overrideDefaultBabelLoader(rules) {
  const customLoaderPath = path.resolve(__dirname, './custom-loader.js');
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
    throw new Error('storybook webpack rules changed');
  }

  loader.options.customize = customLoaderPath;
}

/**
 * @returns {import('storybook-addon-export-to-codesandbox').BabelPluginOptions}
 */
function getCodesandboxBabelOptions() {
  const allPackageInfo = getAllPackageInfo();

  return Object.values(allPackageInfo).reduce((acc, cur) => {
    if (isConvergedPackage(cur.packageJson)) {
      const prereleaseTags = semver.prerelease(cur.packageJson.version);
      const isNonRcPrerelease = prereleaseTags && !prereleaseTags[0].includes('rc');
      acc[cur.packageJson.name] = isNonRcPrerelease
        ? { replace: '@fluentui/react-components/unstable' }
        : { replace: '@fluentui/react-components' };
    }

    return acc;
  }, /** @type import('storybook-addon-export-to-codesandbox').BabelPluginOptions*/ ({}));
}
