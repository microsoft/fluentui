// @ts-check
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
const { addMonacoWebpackConfig } = require('@fluentui/react-monaco-editor/scripts/addMonacoWebpackConfig');
const { getLoadSiteConfig } = require('@fluentui/public-docsite-setup/scripts/getLoadSiteConfig');

/**
 * https://webpack.js.org/configuration/configuration-types/#exporting-a-function
 * @param {Record<string, any>} env variables passed as --env on the command line https://webpack.js.org/guides/environment-variables/
 * @param {Record<string, any>} argv map of command line arguments
 * @returns {import('webpack').Configuration[]}
 */
module.exports = function(env, argv) {
  const version = require('./package.json').version;
  // production mode is either coming from env variable, CLI argument as mode or production
  const isProductionArg =
    (!!env && (!!env.production || env.NODE_ENV === 'production')) ||
    argv.mode === 'production' ||
    argv.production === true;

  const now = Date.now();

  // Must be kept in sync with the value in apps/public-docsite/bin/create-site-manifests.js
  // (just referencing the type, not the actual constant, in case the package hasn't been built yet)
  /** @type {typeof import('@fluentui/public-docsite-setup').BUNDLE_NAME} */
  const entryPointName = 'fabric-site';

  return [
    // Copy index.html and generate bootstrap script
    getLoadSiteConfig({
      libraryPath: path.dirname(require.resolve('@fluentui/react/package.json')),
      outDir: path.join(__dirname, 'dist'),
      isProduction: isProductionArg,
      CopyWebpackPlugin,
    }),
    // Rest of the site
    ...resources.createConfig(
      entryPointName,
      isProductionArg,
      addMonacoWebpackConfig({
        entry: {
          [entryPointName]: './lib/root.js',
        },

        output: {
          chunkFilename: `${entryPointName}-${version}-[name]-${now}${isProductionArg ? '.min' : ''}.js`,
        },

        // The website config intentionally doesn't have React as an external because we bundle it
        // to ensure we get a consistent version.

        resolve: {
          alias: getResolveAlias(true /*useLib*/),
        },
      }),
      // always build the dev bundle too
      /* only production */ false,
    ),
  ];
};
