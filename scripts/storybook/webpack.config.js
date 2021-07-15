const IgnoreNotFoundExportWebpackPlugin = require('ignore-not-found-export-webpack-plugin');
const path = require('path');
const findGitRoot = require('../monorepo/findGitRoot');
const getResolveAlias = require('../webpack/getResolveAlias');
const webpack = require('webpack');

module.exports = (/** @type {webpack.Configuration} */ config) => {
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
            configFile: 'tsconfig.json',
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

  config.resolve.alias = {
    // Use the aliases for react-examples since the examples and demo may depend on some things
    // that the package itself doesn't (and it will include the aliases for all the package's deps)
    ...getResolveAlias(false, path.join(findGitRoot(), 'packages/react-examples')),
  };

  config.plugins.push(new IgnoreNotFoundExportWebpackPlugin({ include: [/\.tsx?$/] }));

  // Disable ProgressPlugin which logs verbose webpack build progress. Warnings and Errors are still logged.
  if (process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME) {
    config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== 'ProgressPlugin');
  }

  config.optimization.minimize = false;

  if (process.env.TF_BUILD) {
    console.log(
      'Storybook webpack config:',
      // Plugins have circular references, and they're probably not the issue here
      JSON.stringify(config, (key, value) => (key === 'plugins' ? undefined : value), 2),
    );
  }

  return config;
};
