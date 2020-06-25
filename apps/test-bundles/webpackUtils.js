const path = require('path');
const fs = require('fs');
const resources = require('@uifabric/build/webpack/webpack-resources');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function createWebpackConfig(entries, includeStats = true) {
  return Object.keys(entries).map(entryName => {
    let anaylizerPluginOptions = {
      analyzerMode: 'static',
      reportFilename: entryName + '.stats.html',
      openAnalyzer: false,
      generateStatsFile: false,
      logLevel: 'warn',
    };

    if (includeStats) {
      anaylizerPluginOptions = {
        ...anaylizerPluginOptions,
        generateStatsFile: true,
        statsOptions: {
          // https://webpack.js.org/configuration/stats
          assets: true,
          modules: true,

          builtAt: false,
          outputPath: false,
          namedChunkGroups: false,
          logging: false,
          children: false,
          source: false,
          reasons: false,
          chunks: false,
          cached: false,
          cachedAssets: false,
          performance: false,
          timings: false,
        },
        statsFilename: entryName + '.stats.json',
      };
    }

    const config = resources.createConfig(
      entryName,
      true,
      {
        entry: {
          [entryName]: entries[entryName],
        },
        externals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        plugins: [new BundleAnalyzerPlugin(anaylizerPluginOptions)],
      },
      true,
      true,
    )[0];

    return config;
  });
}

// Files which should not be considered top-level entries.
const TopLevelEntryFileExclusions = ['index.js', 'version.js', 'index.bundle.js'];

/**
 * Build webpack entries based on top level imports available in a package.
 */
function buildEntries(packageName, entries = {}) {
  let packagePath = '';

  try {
    packagePath = path.dirname(require.resolve(packageName)).replace('lib-commonjs', 'lib');
  } catch (e) {
    console.log(`The package "${packageName}" could not be resolved. Add it as a dependency to this project.`);
    console.log(e);
    return;
  }

  fs.readdirSync(packagePath).forEach(itemName => {
    const isJavascriptFile = itemName.match(/.js$/);
    const isAllowedFile = TopLevelEntryFileExclusions.indexOf(itemName) === -1;

    if (isJavascriptFile && isAllowedFile) {
      const entryName = itemName.replace(/.js$/, '');

      // Replace commonjs paths with lib paths.
      const entryPath = path.join(packagePath, itemName);

      entries[`${packageName.replace('@', '').replace('/', '-')}-${entryName}`] = entryPath;
    }
  });

  return entries;
}

module.exports = {
  createWebpackConfig,
  buildEntries,
};
