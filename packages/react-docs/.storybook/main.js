module.exports = {
  stories: ['../../react-examples/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    // do mutation to the config

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
    // Example for local only storybooks
    ...(process.env.NODE_ENV !== 'production' && {
      react: {
        title: 'React',
        url: 'http://localhost:7007',
      },
      webComponents: {
        title: 'Web Components',
        url: 'http://localhost:7008',
      },
    }),
  },
};
