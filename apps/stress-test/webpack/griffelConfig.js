const { GriffelCSSExtractionPlugin } = require('@griffel/webpack-extraction-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
<<<<<<< HEAD
 * @typedef {('runtime' | 'buildtime' | 'extraction')} GriffelMode
 */

/**
 * @type {import('webpack').RuleSetRule}
=======
 * Webpack configuration object.
 * @typedef {import('webpack').Configuration} WebpackConfig
 */

/**
 * Webpack rules set.
 * @typedef {import('webpack').RuleSetRule} WebpackRuleSetRule
 */

/**
 * @typedef {('runtime' | 'buildtime' | 'extrraction')} GriffelMode
 */

/**
 * @type {WebpackRuleSetRule}
>>>>>>> a82206debc (stress-test: add build commands)
 */
const griffelWebpackLoader = {
  test: /\.(ts|tsx)$/,
  exclude: [/node_modules/, /\.wc\.(ts|tsx)?$/],
  use: {
    loader: '@griffel/webpack-loader',
    options: {
      babelOptions: {
        presets: ['@babel/preset-typescript'],
      },
    },
  },
};

/**
<<<<<<< HEAD
 * @type {import('webpack').RuleSetRule}
=======
 * @type {WebpackRuleSetRule}
>>>>>>> a82206debc (stress-test: add build commands)
 */
const griffelExtractionLoader = {
  test: /\.(js|ts|tsx)$/,
  // Apply "exclude" only if your dependencies **do not use** Griffel
  // exclude: /node_modules/,
  exclude: [/\.wc\.(ts|tsx)?$/, /v9\/simple\-stress/],
  use: {
    loader: GriffelCSSExtractionPlugin.loader,
  },
};
const cssLoader = {
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
};

/**
 * Take the Webpack config object and set properties to
 * configure Griffel.
 *
 * NOTE: this function mutates the `config` object passed in to it.
 *
<<<<<<< HEAD
 * @param {import('webpack').Configuration} config - Webpack configuration object to modify.
 * @param {GriffelMode} griffelMode
 * @returns {import('webpack').Configuration} Modified Webpack configuration object.
=======
 * @param {WebpackConfig} config - Webpack configuration object to modify.
 * @param {GriffelMode} griffelMode
 * @returns {WebpackConfig} Modified Webpack configuration object.
>>>>>>> a82206debc (stress-test: add build commands)
 */
const configureGriffel = (config, griffelMode) => {
  console.log(`Griffel running in ${griffelMode} mode.`);

<<<<<<< HEAD
  config.module = config.module || {};

  let rules = config.module.rules || [];
  let plugins = config.plugins || [];
=======
  let rules = config.module.rules || [];
  let plugins = config.module.plugins || [];
>>>>>>> a82206debc (stress-test: add build commands)

  if (griffelMode === 'extraction') {
    rules = [griffelExtractionLoader, griffelWebpackLoader, cssLoader, ...rules];
    plugins = [...plugins, new MiniCssExtractPlugin(), new GriffelCSSExtractionPlugin()];
  } else if (griffelMode === 'buildtime') {
    rules = [griffelWebpackLoader, ...rules];
  }

  config.module.rules = rules;
  config.plugins = plugins;

  return config;
};

module.exports = {
  configureGriffel,
};
