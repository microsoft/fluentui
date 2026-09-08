// @ts-check

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { getResolveAlias, resources } = require('@fluentui/scripts-webpack');
const { addMonacoWebpackConfig } = require('@fluentui/react-monaco-editor/scripts/addMonacoWebpackConfig');
const { getLoadSiteConfig } = require('@fluentui/public-docsite-setup/scripts/getLoadSiteConfig');

// Must be kept in sync with the value in apps/public-docsite/bin/create-site-manifests.js
// (just referencing the type, not the actual constant, in case the package hasn't been built yet)
/** @type {typeof import('@fluentui/public-docsite-setup').BUNDLE_NAME} */
const entryPointName = 'fabric-site';

const outDirName = 'dist';
const outDir = path.join(__dirname, outDirName);

/** @type {webpack.Configuration[]} */
module.exports = [
  // Copy index.html and generate bootstrap script
  {
    ...getLoadSiteConfig({
      libraryPath: path.dirname(require.resolve('@fluentui/react/package.json')),
      outDir,
      isProduction: false,
      CopyWebpackPlugin,
      webpack,
    }),
    // Uncomment this block to serve previously built files under dist (for example from running
    // yarn bundle --production) -- this is for debugging purposes in special cases only
    // devServer: {
    //   host: 'localhost',
    //   port: 4322,
    //   static: outDir,
    // },
  },
  // Rest of site (comment out if serving previously built files)
  resources.createServeConfig(
    addMonacoWebpackConfig(
      {
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
          alias: {
            ...getResolveAlias(),
            // public-docsite-resources exposes api reference JSON under dist/api that is consumed via
            // require.context; its package exports field cannot map a directory, so alias to the real
            // directory to resolve it.
            '@fluentui/public-docsite-resources/dist/api': path.resolve(
              __dirname,
              '../public-docsite-resources/dist/api',
            ),
            // react-monaco-editor dynamically loads @types/react via proprietary webpack require.ensure,
            // this doesn't work starting @types/react@17.0.48 as the types package introduced Export Maps
            '@types/react/index.d.ts': path.resolve(__dirname, '../../node_modules/@types/react/index.d.ts'),
          },
        },
      },
      { outDir },
    ),
    outDirName,
  ),
];
