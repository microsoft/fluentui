const { resources } = require('@fluentui/scripts-webpack');

module.exports = [
  // Create a bundle for consumption in the browser
  ...resources.createBundleConfig({
    output: 'FluentUIReactCharting',
    /**
     * customConfig: {
     * module: {
          rules: [{
            test: [/\.chartingworker\.ts$/],
            use: {
              loader: 'worker-loader',
              //options: { inline: 'no-fallback' },
              // options: {
              //   experimentalWatchApi: true,
              //   transpileOnly: true,
              // }
            }
          }]
        }
      }
     */
  }),
  // Also build the legacy demo app for the PR deploy site
  require('./webpack.serve.config'),
];
