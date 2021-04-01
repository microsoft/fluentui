// @ts-check

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
const { addMonacoWebpackConfig } = require('@uifabric/tsx-editor/scripts/addMonacoWebpackConfig');
const { getLoadSiteConfig } = require('@fluentui/public-docsite-setup/scripts/getLoadSiteConfig');
const { BUNDLE_NAME: entryPointName } = require('@fluentui/public-docsite-setup');

const outDir = 'dist';

module.exports = [
  // Copy index.html and generate bootstrap script
  getLoadSiteConfig({
    libraryPath: path.dirname(require.resolve('@fluentui/react/package.json')),
    outDir: path.join(__dirname, outDir),
    isProduction: false,
    CopyWebpackPlugin,
    webpack: resources.webpack,
  }),
  // Rest of site
  resources.createServeConfig(
    addMonacoWebpackConfig({
      entry: {
        [entryPointName]: './src/root.tsx',
      },

      output: {
        chunkFilename: `${entryPointName}-[name].js`,
      },

      // The website config intentionally doesn't have React as an external because we bundle it
      // to ensure we get a consistent version.

      optimization: {
        removeAvailableModules: false,
      },

      resolve: {
        alias: getResolveAlias(),
      },
    }),
  ),
];
