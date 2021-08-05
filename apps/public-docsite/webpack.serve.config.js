// @ts-check

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
const { addMonacoWebpackConfig } = require('@fluentui/react-monaco-editor/scripts/addMonacoWebpackConfig');
const { getLoadSiteConfig } = require('@fluentui/public-docsite-setup/scripts/getLoadSiteConfig');

// Must be kept in sync with the value in apps/public-docsite/bin/create-site-manifests.js
// (just referencing the type, not the actual constant, in case the package hasn't been built yet)
/** @type {typeof import('@fluentui/public-docsite-setup').BUNDLE_NAME} */
const entryPointName = 'fabric-site';

const outDir = 'dist';

/** @type {webpack.Configuration[]} */
module.exports = [
  // Copy index.html and generate bootstrap script
  {
    ...getLoadSiteConfig({
      libraryPath: path.dirname(require.resolve('@fluentui/react/package.json')),
      outDir: path.join(__dirname, outDir),
      isProduction: false,
      CopyWebpackPlugin,
      webpack,
    }),
    // Uncomment this block to serve previously built files under dist (for example from running
    // yarn bundle --production) -- this is for debugging purposes in special cases only
    // devServer: {
    //   host: 'localhost',
    //   port: 4322,
    //   static: path.join(__dirname, outDir),
    // },
  },
  // Rest of site (comment out if serving previously built files)
  resources.createServeConfig(
    addMonacoWebpackConfig({
      entry: {
        [entryPointName]: ['react-app-polyfill/ie11', './src/root.tsx'],
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
    outDir,
  ),
];
