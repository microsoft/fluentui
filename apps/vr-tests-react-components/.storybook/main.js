const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = /** @type {import('../../../.storybook/main').StorybookBaseConfig} */ ({
  addons: ['@fluentui/react-storybook-addon'],

  stories: ['../src/**/*.stories.tsx'],
  core: {
    builder: 'webpack5',
    disableTelemetry: true,
  },
  babel: {},
  typescript: {
    // disable react-docgen-typescript (totally not needed here, slows things down a lot)
    reactDocgen: false,
  },
  webpackFinal: config => {
    const tsPaths = new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../../../tsconfig.base.json'),
    });

    if (config.resolve) {
      config.resolve.plugins ? config.resolve.plugins.push(tsPaths) : (config.resolve.plugins = [tsPaths]);
    }

    if (config.module) {
      config.module.rules?.unshift({
        test: /\.(ts|tsx)$/,
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
      });
    }

    return config;
  },
});
