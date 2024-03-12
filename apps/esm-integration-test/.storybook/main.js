module.exports = {
  addons: ['@storybook/addon-essentials'],
  stories: ['../src/**/*.stories.mdx', '../src/index.stories.@(ts|tsx)'],
  core: {
    builder: 'webpack5',
    lazyCompilation: true,
    disableTelemetry: true,
  },
};
