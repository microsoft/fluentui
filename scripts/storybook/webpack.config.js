// @ts-check
const IgnoreNotFoundExportWebpackPlugin = require('ignore-not-found-export-webpack-plugin');
const path = require('path');
const findGitRoot = require('../monorepo/findGitRoot');
const getResolveAlias = require('../webpack/getResolveAlias');
const webpack = require('webpack');

/**
 * Updates the given webpack config to include resolutions and other options for v8 packages.
 * @param {webpack.Configuration} config webpack config, WILL BE MUTATED
 * @returns {webpack.Configuration} the same object that was passed in
 */
module.exports = config => {
  config.resolveLoader = {
    ...config.resolveLoader,
    modules: [
      'node_modules',
      path.join(__dirname, '../../node_modules'),
      path.join(__dirname, '../../../node_modules'),
    ],
  };

  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            configFile: path.join(process.cwd(), 'tsconfig.json'),
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      enforce: 'pre',
      exclude: [/node_modules/],
      use: [
        {
          loader: '@microsoft/loader-load-themed-styles', // creates style nodes from JS strings
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS
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
    },
    {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    },
    {
      test: /\.(woff|woff2|ttf)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    },
    {
      test: /\.md$/,
      loader: 'raw-loader',
    },
  );

  config.resolve = {
    ...config.resolve,
    alias: {
      // Use the aliases for react-examples since the examples and demo may depend on some things
      // that the package itself doesn't (and it will include the aliases for all the package's deps)
      ...getResolveAlias(false, path.join(findGitRoot(), 'packages/react-examples')),
    },
  };

  config.plugins = [...(config.plugins || []), new IgnoreNotFoundExportWebpackPlugin({ include: [/\.tsx?$/] })];

  // Disable ProgressPlugin which logs verbose webpack build progress. Warnings and Errors are still logged.
  if (process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME) {
    config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== 'ProgressPlugin');
  }

  config.optimization = { ...config.optimization, minimize: false };

  return config;
};
