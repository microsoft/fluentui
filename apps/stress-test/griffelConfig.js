const { GriffelCSSExtractionPlugin } = require('@griffel/webpack-extraction-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Webpack configuration object.
 * @typedef {import('webpack').Configuration} WebpackConfig
 */

/**
 * Webpack rules set.
 * @typedef {import('webpack').RuleSetRule} WebpackRuleSetRule
 */

/**
 * @type {string[]}
 */
const griffelModes = ['runtime', 'buildtime', 'extraction'];

/**
 * @type {string}
 */
const mode = process.env.STRESS_TEST_GRIFFEL_MODE;

/**
 * @type {string}
 */
const griffelMode = griffelModes.includes(mode) ? mode : 'runtime';

/**
 * @type {WebpackRuleSetRule[]}
 */
const extractionRules = [
  {
    test: /\.(js|ts|tsx)$/,
    // Apply "exclude" only if your dependencies **do not use** Griffel
    // exclude: /node_modules/,
    exclude: [/\.wc\.(ts|tsx)?$/, /v9\/simple\-stress/],
    use: {
      loader: GriffelCSSExtractionPlugin.loader,
    },
  },
  // Add "@griffel/webpack-loader" if you use Griffel directly in your project
  {
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
  },
  // "css-loader" is required to handle produced CSS assets by Griffel
  // you can use "style-loader" or "MiniCssExtractPlugin.loader" to handle CSS insertion
  {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
  },
];

/**
 * Take the Webpack config object and set properties to
 * configure Griffel.
 *
 * NOTE: this function mutates the `config` object passed in to it.
 *
 * @param {WebpackConfig} config - Webpack configuration object to modify.
 * @returns {WebpackConfig} Modified Webpack configuration object.
 */
const configureGriffel = config => {
  console.log(`Griffel running in ${griffelMode} mode.`);
  if (griffelMode === 'extraction') {
    if (config.module.rules) {
      config.module.rules = [...extractionRules, ...config.module.rules];
    } else {
      config.modules.rules = extractionRules;
    }

    if (config.plugins) {
      config.plugins = [...config.plugins, new MiniCssExtractPlugin(), new GriffelCSSExtractionPlugin()];
    } else {
      config.plugins = [new MiniCssExtractPlugin(), new GriffelCSSExtractionPlugin()];
    }
  }

  return config;
};

module.exports = {
  configureGriffel,
};
