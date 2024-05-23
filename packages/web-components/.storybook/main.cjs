const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const tsBin = require.resolve('typescript');
const tsConfigPath = path.resolve(__dirname, '../../../tsconfig.base.wc.json');

const tsPaths = new TsconfigPathsPlugin({
  configFile: tsConfigPath,
});

module.exports =
  /** @type {Omit<import('../../../.storybook/types').StorybookConfig,'typescript'|'babel'|'previewHead'>} */ ({
    stories: ['../src/**/*.stories.@(ts|mdx)'],
    staticDirs: ['../public'],
    core: {
      builder: 'webpack5',
      disableTelemetry: true,
    },
    addons: [
      {
        name: '@storybook/addon-docs',
      },
      {
        name: '@storybook/addon-essentials',
        options: {
          backgrounds: false,
          viewport: false,
          toolbars: false,
          actions: true,
        },
      },
    ],
    webpackFinal: async config => {
      config.resolve = config.resolve ?? {};
      config.resolve.extensions = config.resolve.extensions ?? [];
      config.resolve.plugins = config.resolve.plugins ?? [];
      config.module = config.module ?? {};
      config.plugins = config.plugins ?? [];

      config.resolve.extensionAlias = {
        '.js': ['.js', '.ts'],
        '.mjs': ['.mjs', '.mts'],
      };
      config.resolve.extensions.push(...['.ts', '.js']);
      config.resolve.plugins.push(tsPaths);
      config.module.rules = config.module.rules ?? [];
      config.module.rules.push(
        {
          test: /\.([cm]?ts|tsx)$/,
          loader: 'ts-loader',
          sideEffects: true,
          options: {
            transpileOnly: true,
            compiler: tsBin,
          },
        },
        // Following config is needed to be able to resolve @storybook packages imported in specified files that don't ship valid ESM
        // It also enables importing other packages without proper ESM extensions, but that should be avoided !
        // @see https://webpack.js.org/configuration/module/#resolvefullyspecified
        {
          test: /\.m?js/,
          resolve: { fullySpecified: false },
        },
      );

      config.plugins.push(
        new CircularDependencyPlugin({
          exclude: /node_modules/,
          failOnError: process.env.NODE_ENV === 'production',
        }),
      );

      // Disable ProgressPlugin which logs verbose webpack build progress. Warnings and Errors are still logged.
      if (process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME) {
        config.plugins = config.plugins.filter(value => value && value.constructor.name !== 'ProgressPlugin');
      }

      return config;
    },
  });
