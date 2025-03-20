const { resources } = require('@fluentui/scripts-webpack');
const TerserPlugin = require('terser-webpack-plugin');

const regex = new RegExp(
  [
    '(truncateText|addNodeShapetoSVG|createPathLink|addLinktoSVG|',
    'createTree|createTreeDataStructure|createTreeChart)$',
  ].join(''),
);
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
              compress: {
                passes: 2,
              },
              mangle: {
                keep_classnames: false,
                keep_fnames: false,
                properties: {
                  regex: regex,
                  undeclared: true,
                },
              },
              output: {
                comments: false,
              },
            },
          }),
        ],
      },
    },
  }),
  // This should be uncommented if we want to build the legacy demo app for the PR deploy site, which should only happen
  // if examples are added under the react-examples/chart-utilities folder.
  // Also build the legacy demo app for the PR deploy site
  // require('./webpack.serve.config'),
];
