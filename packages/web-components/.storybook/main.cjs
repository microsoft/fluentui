const CircularDependencyPlugin = require('circular-dependency-plugin');

const tsBin = require.resolve('typescript');

module.exports = {
  stories: ['../src/**/*.stories.@(ts|mdx)'],
  staticDirs: ['../public'],
  core: {
    builder: 'webpack5',
  },
  features: {
    babelModeV7: true,
    buildStoriesJson: true,
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
        actions: false,
      },
    },
  ],
  webpackFinal: async config => {
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
    };
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
        test: /\.storybook\/.+\.m?js/,
        resolve: { fullySpecified: false },
      },
    );
    config.resolve.extensions.push(...['.ts', '.js']);
    config.plugins.push(
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: process.env.NODE_ENV === 'production',
      }),
    );

    // Disable ProgressPlugin which logs verbose webpack build progress. Warnings and Errors are still logged.
    if (process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME) {
      config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== 'ProgressPlugin');
    }

    return config;
  },
};
