// @ts-check
const path = require('path');
const webpack = require('webpack');
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
module.exports = function (env, argv) {
  const version = require('./package.json').version;
  // production mode is either coming from env variable, CLI argument as mode or production
  const isProductionArg =
    (!!env && (!!env.production || env.NODE_ENV === 'production')) ||
    argv.mode === 'production' ||
    argv.production === true;

  // Must be kept in sync with the value in apps/public-docsite/bin/create-site-manifests.js
  // (just referencing the type, not the actual constant, in case the package hasn't been built yet)
  /** @type {typeof import('@fluentui/public-docsite-setup').BUNDLE_NAME} */
  const entryPointName = 'fabric-site';

  const outDir = path.join(__dirname, 'dist');

  /**
   * @param {boolean} isProductionConfig - Whether this particular config is for dev or production mode
   * @returns {webpack.Configuration}
   */
  function getConfig(isProductionConfig) {
    const chunkSuffix = isProductionConfig ? '.min.js' : '.js';
    const chunkId = isProductionConfig ? '[id]' : 'dev-[id]';

    return addMonacoWebpackConfig(
      {
        entry: {
          [entryPointName]: ['react-app-polyfill/ie11', './lib/root.js'],
        },

        output: {
          // Note that dev and production mode chunks MUST HAVE DIFFERENT NAMES (handled above).
          // Otherwise they'll overwrite each other and cause hard-to-debug errors at runtime.
          chunkFilename: `${entryPointName}-${version}-${chunkId}${chunkSuffix}`,
        },

        // The website config intentionally doesn't have React as an external because we bundle it
        // to ensure we get a consistent version.

        resolve: {
          alias: getResolveAlias(true /*useLib*/),
        },
      },
      { outDir },
    );
  }

  return [
    // Copy index.html and generate bootstrap script
    getLoadSiteConfig({
      libraryPath: path.dirname(require.resolve('@fluentui/react/package.json')),
      outDir,
      isProduction: isProductionArg,
      CopyWebpackPlugin,
      webpack,
    }),
    // Rest of the site.
    // Set up dev/production configs separately because they need different chunkFilename settings.
    ...resources.createConfig(entryPointName, false /*isProduction*/, getConfig(false)),
    ...(isProductionArg
      ? resources.createConfig(entryPointName, true /*isProduction*/, getConfig(true), true /*onlyProduction*/)
      : []),
  ];
};
