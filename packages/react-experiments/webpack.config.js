const { resources } = require('@fluentui/scripts-webpack');

module.exports = [
  // Create a bundle for consumption in the browser
  ...resources.createBundleConfig({
    output: 'FluentUIReactExperiments',
  }),
  // Also build the legacy demo app for the PR deploy site
  require('./webpack.serve.config'),
];
