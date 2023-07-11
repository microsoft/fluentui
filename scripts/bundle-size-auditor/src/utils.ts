import * as path from 'path';
import * as fs from 'fs';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';

type Entry = { entryPath: string; includeStats: boolean };
export type Entries = { [entryName: string]: Entry };

export const FIXTURE_PATH = 'temp/fixtures';
export const FIXTURE_BUILD_PATH = path.join(FIXTURE_PATH, 'build');
export const CONFIG_NAME = 'bundle-size-auditor.config.js';

export function createWebpackConfigTemplate(options: { rootDir: string; entries: Entries; packageName: string }) {
  const { entries, packageName, rootDir } = options;
  const projectRootDir = path.posix.join(rootDir, FIXTURE_PATH);
  const bundleRootPath = path.posix.join(rootDir, FIXTURE_BUILD_PATH);

  const webpackConfig: Parameters<typeof createWebpackConfig>[0] = {
    entries: entries,
    packageName: packageName,
    bundleRootPath: bundleRootPath,
    transpileToEs5: packageName !== '@fluentui/react-northstar',
  };
  const template = `
    const { createWebpackConfig } = require('@fluentui/scripts-bundle-size-auditor');

    module.exports = createWebpackConfig(${JSON.stringify(webpackConfig, null, 2)});
 `;

  const webpackConfigPath = path.join(projectRootDir, 'webpack.bundle-size-auditor.config.js');

  fs.writeFileSync(webpackConfigPath, template, 'utf-8');

  return webpackConfigPath;
}

export function createWebpackConfig(options: {
  entries: Entries;
  packageName: string;
  bundleRootPath: string;
  transpileToEs5: boolean;
}) {
  const { bundleRootPath, entries, transpileToEs5 } = options;

  const cssRule = {
    test: /\.css$/,
    include: /node_modules/,
    use: ['style-loader', 'css-loader'],
  };

  /**
   * As of webpack 5, you have to add the `es5` target for IE 11 compatibility.
   * Otherwise it will output lambdas for smaller bundle size.
   * @see https://webpack.js.org/migrate/5/#need-to-support-an-older-browser-like-ie-11
   *
   * NOTE: IE 11 compat is still needed? for fluentui/react (v8) ?
   */
  const target = ['web', transpileToEs5 ? 'es5' : null].filter(Boolean) as string[];

  return Object.entries(entries).map(([entryName, entryDefinition]) => {
    const { entryPath, includeStats } = entryDefinition;

    const anaylizerPluginOptions: BundleAnalyzerPlugin.Options = {
      analyzerMode: 'static',
      reportFilename: entryName + '.stats.html',
      openAnalyzer: false,
      generateStatsFile: false,
      logLevel: 'warn',
      ...(includeStats
        ? {
            generateStatsFile: true,
            statsFilename: entryName + '.stats.json',
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
          }
        : null),
    };

    const config: webpack.Configuration = {
      mode: 'production',
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
      module: {
        /* TODO: this should be no longer needed ? - https://github.com/webpack/webpack/issues/1721 */
        noParse: [/autoit.js/],
        rules: [cssRule],
      },
      target,
      devtool: undefined,
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: false,
          }),
        ],
      },
      plugins: [
        // This is needed because Webpack 5 no longer automatically resolves process.env values.
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new BundleAnalyzerPlugin(anaylizerPluginOptions),
      ],
    };

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

    return entryPath;
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
