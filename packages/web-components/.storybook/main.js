const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  stories: ['../src/**/*.stories.@(ts|mdx)'],
  core: {
    builder: 'webpack4',
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
    config.module.rules.push({
      test: /\.ts$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
      ],
    });
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
