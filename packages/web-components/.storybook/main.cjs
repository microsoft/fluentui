const CircularDependencyPlugin = require('circular-dependency-plugin');
const ResolveTypescriptPlugin = require('resolve-typescript-plugin');

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
    config.resolve.plugins = [new ResolveTypescriptPlugin()];
    config.module.rules.push(
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        sideEffects: true,
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /.storybook\/preview.js/,
        resolve: { fullySpecified: false },
      },
    );
    config.resolve.extensions.push('.ts');
    config.resolve.extensions.push('.js');
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
