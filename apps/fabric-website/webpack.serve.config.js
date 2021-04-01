const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const resources = require('../../scripts/webpack/webpack-resources');
const { getLoadSiteConfig } = require('@fluentui/public-docsite-setup/scripts/getLoadSiteConfig');
const { BUNDLE_NAME: entryPointName } = require('@fluentui/public-docsite-setup');

module.exports = [
  // Copy index.html and generate bootstrap script
  getLoadSiteConfig({
    libraryPath: path.dirname(require.resolve('office-ui-fabric-react/package.json')),
    outDir: path.join(__dirname, 'dist'),
    isProduction: false,
    CopyWebpackPlugin
  }),
  // Rest of site
  resources.createServeConfig({
    entry: {
      [entryPointName]: './src/root.tsx'
    },

    output: {
      chunkFilename: `${entryPointName}-[name].js`
    },

    devServer: {
      inline: true,
      port: 4321
    },

    // The website config intentionally doesn't have React as an external because we bundle it
    // to ensure we get a consistent version.

    resolve: {
      alias: {
        '@uifabric/fabric-website/src': path.join(__dirname, 'src'),
        '@uifabric/fabric-website/lib': path.join(__dirname, 'lib'),
        'office-ui-fabric-react$': path.join(__dirname, 'node_modules/office-ui-fabric-react/lib'),
        'office-ui-fabric-react/src': path.join(__dirname, 'node_modules/office-ui-fabric-react/src'),
        'office-ui-fabric-react/lib': path.join(__dirname, 'node_modules/office-ui-fabric-react/lib'),
        '@uifabric/example-app-base$': path.join(__dirname, '../../packages/example-app-base/src'),
        'Props.ts.js': 'Props',
        'Example.tsx.js': 'Example'
      }
    }
  })
];
