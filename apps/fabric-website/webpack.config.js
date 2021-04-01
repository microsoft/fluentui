// @ts-check
module.exports = function (env) {
  const path = require('path');
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  const resources = require('../../scripts/webpack/webpack-resources');
  const { getLoadSiteConfig } = require('@fluentui/public-docsite-setup/scripts/getLoadSiteConfig');
  const { BUNDLE_NAME: entryPointName } = require('@fluentui/public-docsite-setup');

  const version = require('./package.json').version;
  const isProductionArg = !!env && env.production;

  const now = Date.now();

  return [
    // Copy index.html and generate bootstrap script
    getLoadSiteConfig({
      libraryPath: path.dirname(require.resolve('office-ui-fabric-react/package.json')),
      outDir: path.join(__dirname, 'dist'),
      isProduction: isProductionArg,
      CopyWebpackPlugin
    }),
    // Rest of the site
    ...resources.createConfig(
      entryPointName,
      isProductionArg,
      {
        entry: {
          [entryPointName]: './lib/root.js'
        },

        output: {
          chunkFilename: `${entryPointName}-${version}-[name]-${now}${isProductionArg ? '.min' : ''}.js`
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
            '@uifabric/api-docs/lib': path.join(__dirname, 'node_modules/@uifabric/api-docs/lib')
          }
        }
      },
      isProductionArg /* only production */
    )
  ];
};
