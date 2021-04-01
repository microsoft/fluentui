// @ts-check
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const resources = require('../../scripts/tasks/webpack-resources');
const { getLoadSiteConfig } = require('@fluentui/public-docsite-setup/scripts/getLoadSiteConfig');
const { BUNDLE_NAME: entryPointName } = require('@fluentui/public-docsite-setup');

const devServerConfig = {
  inline: true,
  port: 4321
};

const outputConfig = {
  filename: entryPointName + '.js'
}

module.exports = [
  // Copy index.html and generate bootstrap script
  getLoadSiteConfig({
    libraryPath: path.dirname(require.resolve('office-ui-fabric-react/package.json')),
    outDir: path.join(__dirname, 'dist'),
    isProduction: false,
    CopyWebpackPlugin,
    webpack: resources.webpack
  }),
  // Rest of the site
  resources.createServeConfig({
    entry: './src/root.tsx',

    output: outputConfig,

    devServer: devServerConfig,

    // The website config intentionally doesn't have React as an external because we bundle it
    // to ensure we get a consistent version.

    resolve: {
      alias: {
        'office-ui-fabric-react/src': path.join(__dirname, 'node_modules/office-ui-fabric-react/src'),
        'office-ui-fabric-react/lib': path.join(__dirname, 'node_modules/office-ui-fabric-react/lib'),
        'Props.ts.js': 'Props',
        'Example.tsx.js': 'Example'
      }
    }
  })
];

