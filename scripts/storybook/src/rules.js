const { _createCodesandboxRule } = require('./utils');

/**
 * v8 uses SCSS/CSS modules
 * @type {import("webpack").RuleSetRule}
 */
const scssRule = {
  test: /\.scss$/,
  enforce: 'pre',
  exclude: [/node_modules/],
  use: [
    {
      // creates style nodes from JS strings
      loader: '@microsoft/loader-load-themed-styles',
    },
    {
      // translates CSS into CommonJS
      loader: 'css-loader',
      options: {
        esModule: false,
        modules: true,
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
};

/**
 *
 * @type {import("webpack").RuleSetRule}
 */
const griffelRule = {
  test: /\.tsx?$/,
  exclude: [/node_modules/],
  enforce: 'post',
  use: [
    {
      loader: '@griffel/webpack-loader',
      options: {
        babelOptions: {
          presets: ['@babel/preset-typescript'],
        },
      },
    },
  ],
};

/**
 * @type {import("webpack").RuleSetRule}
 */
const codesandboxRule = _createCodesandboxRule();

exports.scssRule = scssRule;
exports.griffelRule = griffelRule;
exports.codesandboxRule = codesandboxRule;
