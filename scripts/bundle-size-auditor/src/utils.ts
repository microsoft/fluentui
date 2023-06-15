import * as path from 'path';
import * as fs from 'fs';
import { resources } from '@fluentui/scripts-webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin';

type Entry = { entryPath: string; includeStats: boolean };
type Entries = { [entryName: string]: Entry };

export const FIXTURE_PATH = 'temp/fixtures';
export const FIXTURE_BUILD_PATH = path.join(FIXTURE_PATH, 'build');

export function createWebpackConfigTemplate(cwd: string, entries: Entries, packageName: string) {
  const rootDir = path.posix.join(cwd, FIXTURE_PATH);
  const bundleRootPath = path.posix.join(cwd, FIXTURE_BUILD_PATH);
  const template = `
    const { createWebpackConfig } = require('@fluentui/scripts-bundle-size-auditor');

    module.exports = createWebpackConfig('${JSON.stringify(entries)}', '${packageName}', '${bundleRootPath}');
 `;

  const webpackConfigPath = path.join(rootDir, 'webpack.bundle-size-auditor.config.js');

  fs.writeFileSync(webpackConfigPath, template, 'utf-8');

  return webpackConfigPath;
}

export function createWebpackConfig(entriesJson: string, packageName: string, bundleRootPath: string) {
  const entries: Entries = JSON.parse(entriesJson);

  return Object.keys(entries).map(entryName => {
    let anaylizerPluginOptions: BundleAnalyzerPlugin.Options = {
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
        /**
         * https://webpack.js.org/configuration/stats
         */
        statsOptions: {
          assets: true,
          modules: true,

          builtAt: false,
          outputPath: false,
          chunkModules: false,
          // namedChunkGroups: false,
          chunkGroups: false,
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
          [entryName]: entryPath,
        },
        output: {
          filename: `[name].min.js`,
          path: bundleRootPath,
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

    if (packageName === '@fluentui/react-northstar') {
      // This is used most of the configs for IE 11 compat, which northstar doesn't need
      delete config.target;
    }

    return config;
  });
}

export function createEntry(cwd: string, packageName: string) {
  try {
    // import everything from a single package
    const importStatement = `import * as p from '${packageName}'; console.log(p)`;
    const folderName = getFolderName(packageName);
    const entryPath = path.join(cwd, FIXTURE_PATH, folderName, 'index.js');
    writeFileSync(entryPath, importStatement, 'utf-8');
  } catch (err) {
    console.log(err);
  }
}

/**
 * Build webpack entries from created fixtures.
 *
 * @param includeStats - Stats are generated and used by the size auditor report
to check more details on what caused the bundle size change. Due to stats generation being slow,
and therefore slowing down CI significantly, setting this to true to avoid stats generation.
If bundle size is changed unexpectedly, developers can drill down deeper on the problem by
locally running bundle tests.
 */
export function buildEntries(cwd: string, packageName: string, entries: Entries = {}, includeStats = true) {
  const folderName = getFolderName(packageName);
  const packagePath = path.join(cwd, FIXTURE_PATH, folderName);

  fs.readdirSync(packagePath).forEach(itemName => {
    const entryName = itemName.replace(/.js$/, '');
    const entryPath = path.resolve(path.join(packagePath, itemName));
    entries[`${packageName.replace('@', '').replace('/', '-')}-${entryName}`] = {
      entryPath,
      includeStats,
    };
  });

  return entries;
}

/**
 * Build entries for single fixture with top level import.
 */
export function buildEntry(cwd: string, packageName: string, includeStats = true) {
  const folderName = getFolderName(packageName);
  const entryPath = path.join(cwd, FIXTURE_PATH, folderName);
  const entryKey = `${packageName.replace('@fluentui/', '').replace('/', '-')}`;

  return {
    [entryKey]: {
      entryPath: `${entryPath}/index.js`,
      includeStats,
    },
  };
}

function getFolderName(packageName: string) {
  return packageName.replace('@fluentui/', '');
}

export function writeFileSync(filePath: string, contents: string, encoding: BufferEncoding) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents, encoding);
}
