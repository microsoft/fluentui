// @ts-check
import * as custom from '@uifabric/build/storybook/webpack.config';
import * as path from 'path';
import * as webpack from 'webpack';

export default {
  addons: ['@storybook/addon-a11y/register'],
  webpackFinal: (/** @type {webpack.Configuration} */ config) => {
    config = custom(config);

    config.module.rules.push({
      // Special loader that only includes stories from the current package
      test: /\.storybook[/\\]preview.js/,
      loader: path.resolve(__dirname, 'preview-loader.js'),
    });

    return config;
  },
};
