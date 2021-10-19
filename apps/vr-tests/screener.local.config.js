module.exports = {
  projectRepo: 'microsoft/fluentui',
  storybookConfigDir: '.storybook',
  /*
    We need to force version 5, regardless of our current version.
    This is due to an implementation limitation on the `storybook-screener` package.
    Read more about it here: https://github.com/microsoft/fluentui/pull/19257
  */
  storybookVersion: '5',
  storybookBinPath: '../../node_modules/.bin/',
  apiKey: process.env.SCREENER_API_KEY,
  resolution: '1024x768',
  baseBranch: 'master',
  branch: 'localTest',
};
