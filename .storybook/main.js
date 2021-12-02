const path = require('path');
const fs = require('fs');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

/**
 *  @callback StorybookWebpackConfig
 *  @param {import("webpack").Configuration} config
 *  @param {{configType: 'DEVELOPMENT' | 'PRODUCTION'}} options - change the build configuration. 'PRODUCTION' is used when building the static version of storybook.
 *  @returns {import("webpack").Configuration}
 */

/**
 *  @typedef {{
 *    check:boolean;
 *    checkOptions: Record<string,unknown>;
 *    reactDocgen: string | boolean;
 *    reactDocgenTypescriptOptions: Record<string,unknown>
 *  }} StorybookTsConfig
 */

/**
 *  @typedef {{
 *    stories: string[];
 *    addons: string[];
 *    typescript: StorybookTsConfig;
 *    babel: (options:Record<string,unknown>)=>Promise<Record<string,unknown>>;
 *    webpackFinal: StorybookWebpackConfig;
 *    core: {builder:'webpack5'};
 *    previewHead: (head: string) => string
 * }} StorybookConfig
 */

/**
 * @typedef  {{loader: string; options: { [index: string]: any }}} LoaderObjectDef
 */

const previewHeadTemplate = fs.readFileSync(path.resolve(__dirname, 'preview-head-template.html'), 'utf8');

module.exports = /** @type {Omit<StorybookConfig,'typescript'|'babel'>} */ ({
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-knobs/preset',
    'storybook-addon-performance',
    'storybook-addon-export-to-codesandbox',
  ],
  webpackFinal: config => {
    const tsPaths = new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../tsconfig.base.json'),
    });

    if (config.resolve) {
      config.resolve.plugins ? config.resolve.plugins.push(tsPaths) : (config.resolve.plugins = [tsPaths]);
    }

    if (config.module && config.module.rules) {
      config.module.rules.unshift({
        test: /\.stories\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require('storybook-addon-export-to-codesandbox').babelPlugin],
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
  },
  /**
   * Programmatically enhance previewHead as inheriting just static file `preview-head.html` doesn't work in monorepo
   * @see https://storybook.js.org/docs/react/addons/writing-presets#previewmanager-templates
   */
  previewHead: head => head + previewHeadTemplate,
});
