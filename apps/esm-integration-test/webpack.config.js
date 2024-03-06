// @ts-check

const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    },
  ],
};

/**
 *
 * @type {import("webpack").RuleSetRule}
 */
const swcRule = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'swc-loader',
    options: {
      jsc: {
        target: 'es2019',
        parser: {
          syntax: 'typescript',
          tsx: true,
          decorators: true,
          dynamicImport: true,
        },
        transform: {
          decoratorMetadata: true,
          legacyDecorator: true,
          react: {
            runtime: 'automatic',
          },
        },
        keepClassNames: true,
        externalHelpers: true,
        loose: true,
      },
    },
  },
};

module.exports = /** @type {import('webpack').Configuration} */ ({
  mode: 'development',
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [griffelRule, swcRule],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: '<div id="root"></div>',
    }),
  ],
});
