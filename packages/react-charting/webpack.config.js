const { resources } = require('@fluentui/scripts-webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  // Create a bundle for consumption in the browser
  ...resources.createBundleConfig({
    output: 'FluentUIReactCharting',
    customConfig: {
      optimization: {
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              // https://github.com/terser/terser
              mangle: {
                // properties: {
                //   regex: /^_/,
                // },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                keep_classnames: false,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                keep_fnames: false,
                properties: {
                  //regex: /^_/,
                  regex: /((?<=\b|\.)(?=\b[a-zA-Z$_])\w+)|^_/g,
                },
              },
              output: {
                beautify: false,
                comments: false,
              },
            },
          }),
        ],
      },
    },
  }),
  // Also build the legacy demo app for the PR deploy site
  require('./webpack.serve.config'),
];
