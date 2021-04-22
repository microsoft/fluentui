// @ts-check
const fs = require('fs');
const path = require('path');

/**
 * Gets a webpack config which copies `@fluentui/public-docsite-setup/index.html` to `outDir` and
 * generates `loadSite.js` used to load the site for the given library version.
 *
 * Should work with webpack 4+ and `copy-webpack-plugin` 4+.
 *
 * @param {object} options
 * @param {string} options.libraryPath Path to the main library: `@fluentui/react` or `office-ui-fabric-react`
 * @param {string} options.outDir Absolute path to the output directory
 * @param {boolean} options.isProduction Whether to do a production build (same filename is used regardless)
 * @param {*} options.CopyWebpackPlugin Constructor for `copy-webpack-plugin` 4+
 * @param {import('webpack')} options.webpack Result of `require('webpack')`, to ensure the correct one is used
 * @returns {import('webpack').Configuration}
 */
function getLoadSiteConfig(options) {
  const { libraryPath, outDir, isProduction, CopyWebpackPlugin, webpack } = options;
  const setupPackagePath = path.dirname(require.resolve('@fluentui/public-docsite-setup/package.json'));
  const libraryVersion = JSON.parse(fs.readFileSync(`${libraryPath}/package.json`, 'utf-8')).version;

  /** @type {ConstructorParameters<import('copy-webpack-plugin')>[0]['patterns']} */
  const copyPatterns = [{ from: path.join(setupPackagePath, 'index.html'), to: outDir }];
  let copyPlugin;
  try {
    copyPlugin = new CopyWebpackPlugin({ patterns: copyPatterns });
  } catch (err) {
    // copy-webpack-plugin >= 6 requires Node 10+ and takes an object containing patterns.
    // Fabric 5 and 6 still support Node 8, so they need to use copy-webpack-plugin@5 which
    // takes the patterns themselves as the first parameter.
    copyPlugin = new CopyWebpackPlugin(copyPatterns);
  }

  return {
    entry: path.join(setupPackagePath, 'lib/loadSite.js'),

    devtool: isProduction ? false : 'cheap-module-source-map',

    mode: isProduction ? 'production' : 'development',

    output: {
      filename: 'loadSite.js',
      path: outDir,
      pathinfo: false,
      // The code in lib/loadSite.js is intended to run as a side effect on load.
      // Note that for 4/5 compatibility this must use individual properties, not a `library` object.
      library: '__loadSite', // not used, needed for correct output
      libraryTarget: 'global',
    },

    plugins: [
      new webpack.DefinePlugin({
        // This is only used for the local or PR deploy sites
        ['process.env.LOCAL_LIBRARY_VERSION']: JSON.stringify(libraryVersion),
        // This is mainly used (set to false) by generate-homepage to remove parts that aren't needed
        // for homepage.htm on the live site, so here we just set it to true
        ['process.env.LOCAL']: JSON.stringify(true),
      }),
      copyPlugin,
    ],
  };
}

module.exports = { getLoadSiteConfig };
