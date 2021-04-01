// @ts-check
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
const { addMonacoWebpackConfig } = require('@uifabric/tsx-editor/scripts/addMonacoWebpackConfig');
const { getLoadSiteConfig } = require('@fluentui/public-docsite-setup/scripts/getLoadSiteConfig');
const { BUNDLE_NAME: entryPointName } = require('@fluentui/public-docsite-setup');

/**
 * https://v4.webpack.js.org/configuration/configuration-types/#exporting-a-function
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
