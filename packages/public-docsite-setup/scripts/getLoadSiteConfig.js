// @ts-check
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Gets a webpack config which copies `@fluentui/public-docsite-setup/index.html` to `outDir` and
 * generates `loadSite.js` used to load the site for the given library version.
 *
 * Should work with webpack 4+. Requires `copy-webpack-plugin` 5+ to be installed.
 *
 * @param {object} options
 * @param {string} options.libraryName Name of the main library: `@fluentui/react` or `office-ui-fabric-react`
 * @param {string} options.outDir Absolute path to the output directory
 * @param {boolean} options.isProduction Whether to do a production build (same filename is used regardless)
 * @returns {import('webpack').Configuration}
 */
function getLoadSiteConfig(options) {
  const { libraryName, outDir, isProduction } = options;
  const setupPackagePath = path.dirname(require.resolve('@fluentui/public-docsite-setup/package.json'));
  const libraryVersion = require(`${libraryName}/package.json`).version;

  /** @type {ConstructorParameters<CopyWebpackPlugin>[0]['patterns']} */
  const copyPatterns = [{ from: path.join(setupPackagePath, 'index.html'), to: outDir }];
  const copyPluginVersion = Number(require('copy-webpack-plugin/package.json').version.match(/^\d+/)[0]);

  return {
    entry: path.join(setupPackagePath, 'lib/loadSite.js'),

    devtool: isProduction ? false : 'cheap-module-source-map',

    mode: isProduction ? 'production' : 'development',

    output: {
      filename: 'loadSite.js',
      iife: true, // wrap in IIFE to avoid global pollution
      path: outDir,
      pathinfo: false,
      library: {
        // The code in lib/loadSite.js is intended to run as a side effect on load
        type: 'global',
        name: '__loadSite', // not used
      },
    },

    plugins: [
      new webpack.DefinePlugin({
        // This is only used for the local or PR deploy sites
        ['process.env.LOCAL_LIBRARY_VERSION']: JSON.stringify(libraryVersion),
      }),
      // copy-webpack-plugin >= 6 requires Node 10+ and takes an object containing patterns.
      // Fabric 5 and 6 still support Node 8, so they need to use copy-webpack-plugin@5 which
      // takes the patterns themselves as the first parameter.
      new CopyWebpackPlugin(copyPluginVersion >= 6 ? { patterns: copyPatterns } : /** @type {*} */ (copyPatterns)),
    ],
  };
}

module.exports = { getLoadSiteConfig };
