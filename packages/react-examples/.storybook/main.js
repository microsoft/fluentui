import { createStorybookWebpackConfig } from '@fluentui/scripts-webpack';
import * as path from 'path';
import { merge } from 'webpack-merge';

/** @type {Partial<import('@storybook/core-common').StorybookConfig>} */
const config = {
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    'storybook-addon-performance',
    {
      name: '@storybook/addon-knobs',
      options: { escapeHTML: false },
    },
  ],
  typescript: {
    // disable react-docgen-typescript due to perf issues
    // (also appears that it would require more configuration to work properly)
    reactDocgen: false,
  },
  webpackFinal: config => {
    const customConfig = createStorybookWebpackConfig(config);

    return merge(customConfig, {
      module: {
        rules: [
          {
            // Special loader that only includes stories from the current package
            test: /\.storybook[/\\]preview.js/,
            loader: path.resolve(__dirname, 'preview-loader.js'),
          },
        ],
      },
      resolve: {
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
          vm: require.resolve('vm-browserify'),
          path: require.resolve('path-browserify'),
        },
      },
    });
  },

  core: {
    builder: 'webpack5',
    disableTelemetry: true,
  },
};

export default config;
