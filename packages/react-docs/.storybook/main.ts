module.exports = {
  stories: ['../../react-button/src/**/*.stories.tsx', '../stories/**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '../src/addons/design-tokens/register',
  ],

  webpackFinal: async (config) => {
    // do mutation to the config

    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
    });

    return config;
  },

  // your Storybook configuration
  refs: {
    miro: {
      title: 'Miroslav Stastny',
      url: 'https://60088dd0e49a64002183357c-ncilogmlgq.chromatic.com',
    },
    justin: {
      title: 'Justin Slone',
      url: 'https://6008f800bdb9db002140ac05-vaxwghzuqf.chromatic.com',
    },
  },
};
