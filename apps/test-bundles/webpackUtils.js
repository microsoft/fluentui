// @ts-check
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const resources = require('@fluentui/scripts/webpack/webpack-resources');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

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
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              extractComments: false,
            }),
          ],
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

function createEntries(packageName, isNorthstar) {
  const replacePath = isNorthstar ? ['commonjs', 'es'] : ['lib-commonjs', 'lib'];
  const distPath = path.dirname(require.resolve(packageName).replace(replacePath[0], replacePath[1]));
  const packagePath = path.resolve(distPath, isNorthstar ? 'components' : '');
  fs.readdirSync(packagePath).forEach(itemName => {
    const isFolder = fs.statSync(path.join(packagePath, itemName)).isDirectory();
    const isAllowedFile = itemName.match(/.js$/) && !TopLevelEntryFileExclusions.includes(itemName);

    if ((!isAllowedFile && !(isNorthstar && isFolder)) || !itemName) {
      return;
    }

    const item = isFolder ? itemName : itemName.replace(/.js$/, '');
    const importStatement = `import { ${item} } from '${packageName}'; console.log(${item})`;
    try {
      const folderName = getFolderName(packageName);
      if (!fs.existsSync(`fixtures/${folderName}`)) {
        mkdirp.sync(`fixtures/${folderName}`);
      }
      const entryPath = path.join('fixtures/', folderName, `${item}.js`);
      fs.writeFileSync(entryPath, importStatement, 'utf-8');
    } catch (err) {
      console.log(err);
    }
  });
}

function createEntry(packageName) {
  try {
    const importStatement = `import p from '${packageName}'; console.log(p)`;
    const folderName = getFolderName(packageName);
    if (!fs.existsSync(`fixtures/${folderName}`)) {
      mkdirp.sync(`fixtures/${folderName}`);
    }
    const entryPath = path.join('fixtures/', folderName, 'index.js');
    fs.writeFileSync(entryPath, importStatement, 'utf-8');
  } catch (err) {
    console.log(err);
  }
}

/**
 * Build webpack entries based on top level imports available in a package.
 *
 * @param {boolean} [includeStats] - Stats are generated and used by the size auditor report
 * to check more details on what caused the bundle size change. Due to stats generation being slow,
 * and therefore slowing down CI significantly, setting this to true to avoid stats generation.
 * If bundle size is changed unexpectedly, developers can drill down deeper on the problem by
 * locally running bundle tests.
 * @param {boolean} [onlyOwnComponents] - If true, only run the tests for an entry point file if it
 * has a corresponding folder under `lib/components`. This eliminates duplicate bundle size tests
 * for components which are just re-exported.
 */
function buildEntries(packageName, entries = {}, includeStats = true, onlyOwnComponents = false) {
  const folderName = getFolderName(packageName);
  const packagePath = path.join('fixtures/', folderName);

  fs.readdirSync(packagePath).forEach(itemName => {
    const entryName = itemName.replace(/.js$/, '');
    const entryPath = path.resolve(path.join(packagePath, itemName));
    entries[`${packageName.replace('@', '').replace('/', '-')}-${entryName}`] = {
      entryPath: entryPath,
      includeStats,
    };
  });

  return entries;
}

/**
 * Create entries for single top level import.
 */
function buildEntry(packageName, includeStats = true) {
  const folderName = getFolderName(packageName);
  const entryPath = path.resolve(path.join('fixtures/', folderName));
  return {
    entryPath: `${entryPath}/index.js`,
    includeStats,
  };
}

function getFolderName(packageName) {
  return packageName.replace('@fluentui/', '');
}

module.exports = {
  createWebpackConfig,
  buildEntries,
  buildEntry,
  createEntries,
  createEntry,
};
