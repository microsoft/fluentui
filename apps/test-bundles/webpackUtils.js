const path = require('path');
const fs = require('fs');
const resources = require('@uifabric/build/webpack/webpack-resources');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function createWebpackConfig(entries) {
  return Object.keys(entries).map(entryName => {
    let anaylizerPluginOptions = {
      analyzerMode: 'static',
      reportFilename: entryName + '.stats.html',
      openAnalyzer: false,
      generateStatsFile: false,
      logLevel: 'warn',
    };

    const { entryPath, includeStats } = entries[entryName];

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

    return resources.createConfig(
      entryName,
      true,
      {
        entry: {
          [entryName]: entryPath,
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
  });
}

// Files which should not be considered top-level entries.
const TopLevelEntryFileExclusions = ['index.js', 'version.js', 'index.bundle.js'];

/**
 * Build webpack entries based on top level imports available in a package.
 *
 * @param {*} includeStats - Stats are generated and used by the size auditor report
 * to check more details on what caused the bundle size change. Due to stats generation being slow,
 * and therefore slowing down CI significantly, setting this to true to avoid stats generation.
 * If bundle size is changed unexpectedly, developers can drill down deeper on the problem by
 * locally running bundle tests.
 */
function buildEntries(packageName, entries = {}, includeStats = true) {
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

      entries[`${packageName.replace('@', '').replace('/', '-')}-${entryName}`] = {
        entryPath,
        includeStats,
      };
    }
  });

  return entries;
}

/**
 * Create entries for single top level import.
 */
function buildEntry(packageName, includeStats = true) {
  return {
    entryPath: path.join(path.dirname(require.resolve(packageName)).replace('lib-commonjs', 'lib'), 'index.js'),
    includeStats,
  };
}

module.exports = {
  createWebpackConfig,
  buildEntries,
  buildEntry,
};
