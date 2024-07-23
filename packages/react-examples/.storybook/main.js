import { createStorybookWebpackConfig } from '@fluentui/scripts-webpack';
import * as fs from 'fs';
import * as path from 'path';
import { merge } from 'webpack-merge';

/** @type {Partial<import('@storybook/core-common').StorybookConfig>} */
const config = {
  stories: getStories(),
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

function getStories() {
  const packageName = path.basename(__dirname);

  if (!fs.existsSync(path.resolve(__dirname, '../src', packageName))) {
    throw new Error(`Package ${packageName} does not have examples!`);
  }

  // For @fluentui/react's storybook, also include examples from @fluentui/react-focus
  if (packageName === 'react') {
    return ['../src/react/**/*.stories.tsx', '../src/react-focus/**/*.stories.tsx'];
  }

  return [`../src/${packageName}/**/*.stories.tsx`];
}

export default config;
