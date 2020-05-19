// @ts-check
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import IgnoreNotFoundExportWebpackPlugin from 'ignore-not-found-export-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import getResolveAlias from '@uifabric/build/webpack/getResolveAlias';

export default {
  addons: ['@storybook/addon-a11y/register'],
  webpackFinal: (/** @type {webpack.Configuration} */ config) => {
    config.resolveLoader = {
      ...config.resolveLoader,
      modules: [
        'node_modules',
        path.resolve(__dirname, '../../../scripts/node_modules'),
        path.resolve(__dirname, '../../../node_modules'),
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
              modules: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [require('autoprefixer')];
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
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        // Special loader that only includes stories from the current package
        test: /\.storybook[/\\]preview.js/,
        loader: path.resolve(__dirname, 'preview-loader.js'),
      },
    );

    config.resolve.extensions.push('.ts', '.tsx');

    config.resolve.alias = getResolveAlias();

    config.plugins.push(new HardSourceWebpackPlugin(), new IgnoreNotFoundExportWebpackPlugin({ include: [/\.tsx?$/] }));

    config.optimization.minimize = false;

    return config;
  },
};
