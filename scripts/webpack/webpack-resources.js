// @ts-check

/**
 * @typedef {import("webpack").Configuration} WebpackConfig
 * @typedef {WebpackConfig & { devServer?: object }} WebpackServeConfig
 * @typedef {import("webpack").ModuleOptions} WebpackModule
 * @typedef {import("webpack").Configuration['output']} WebpackOutput
 */
/** */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
/** @type {(c1: Partial<WebpackServeConfig>, c2: Partial<WebpackServeConfig>) => WebpackServeConfig} */
const merge = require('../tasks/merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const getResolveAlias = require('./getResolveAlias');
const { findGitRoot } = require('../monorepo/index');

// @ts-ignore
const webpackVersion = require('webpack/package.json').version;
const getDefaultEnvironmentVars = require('./getDefaultEnvironmentVars');

console.log(`Webpack version: ${webpackVersion}`);

const gitRoot = findGitRoot();

const cssRule = {
  test: /\.css$/,
  include: /node_modules/,
  use: ['style-loader', 'css-loader'],
};

/**
 * As of webpack 5, you have to add the `es5` target for IE 11 compatibility.
 * Otherwise it will output lambdas for smaller bundle size.
 * https://webpack.js.org/migrate/5/#need-to-support-an-older-browser-like-ie-11
 */
const target = ['web', 'es5'];

module.exports = {
  webpack,

  /** Get the list of node_modules directories where loaders should be resolved */
  getResolveLoaderDirs: () => [
    'node_modules',
    path.resolve(__dirname, '../node_modules'),
    path.resolve(__dirname, '../../node_modules'),
  ],

  /**
   * @param {string} bundleName - Name for the bundle file. Usually either the unscoped name, or
   * the scoped name with a - instead of / between the parts.
   * @param {boolean} isProduction - whether it's a production build.
   * @param {Partial<WebpackConfig>} customConfig - partial custom webpack config, merged into each full config object.
   * @param {boolean} [onlyProduction] - whether to only generate the production config.
   * @param {boolean} [excludeSourceMaps] - whether to skip generating source maps.
   * @param {boolean} [profile] - whether to profile the bundle using webpack-bundle-analyzer.
   * @returns {WebpackConfig[]} array of configs.
   */
  createConfig(bundleName, isProduction, customConfig, onlyProduction, excludeSourceMaps, profile) {
    const packageName = path.basename(process.cwd());

    /** @type {WebpackModule} */
    const module = {
      noParse: [/autoit.js/],
      rules: excludeSourceMaps
        ? [cssRule]
        : [
            {
              test: /\.js$/,
              use: 'source-map-loader',
              enforce: 'pre',
            },
            cssRule,
          ],
    };

    const devtool = 'cheap-module-source-map';
    const configs = [];

    if (!onlyProduction) {
      configs.push(
        merge(
          {
            mode: 'development',
            output: {
              filename: `[name].js`,
              path: path.resolve(process.cwd(), 'dist'),
              pathinfo: false,
            },
            module,
            target,
            devtool,
            plugins: getPlugins(packageName, false),
          },
          customConfig,
        ),
      );
    }

    if (isProduction) {
      configs.push(
        merge(
          {
            mode: 'production',
            output: {
              filename: `[name].min.js`,
              path: path.resolve(process.cwd(), 'dist'),
            },

            module,
            target,
            devtool: excludeSourceMaps ? undefined : devtool,
            plugins: getPlugins(packageName, true, profile),
          },
          customConfig,
        ),
      );
    }

    for (let config of configs) {
      config.resolveLoader = {
        modules: [
          'node_modules',
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../../node_modules'),
        ],
      };
    }

    return configs;
  },

  /**
   * Creates a standard bundle config for a package.
   * @param {object} options
   * @param {string|WebpackOutput} options.output - If a string, name for the output varible.
   * If an object, full custom `output` config.
   * @param {string} [options.bundleName] - Name for the bundle file. Defaults to the package folder name
   * (unscoped package name).
   * @param {string} [options.entry] - custom entry if not `./lib/index.js`
   * @param {boolean} [options.isProduction] - whether it's a production build.
   * @param {boolean} [options.onlyProduction] - whether to generate the production config.
   * @param {Partial<WebpackConfig>} [options.customConfig] - partial custom webpack config, merged into each full config object
   * @returns {WebpackConfig[]}
   */
  createBundleConfig(options) {
    const {
      output,
      bundleName = path.basename(process.cwd()),
      entry = './lib/index.js',
      isProduction = process.argv.includes('--mode=production'),
      onlyProduction = false,
      customConfig = {},
    } = options;

    return module.exports.createConfig(
      bundleName,
      isProduction,
      merge(
        {
          entry: {
            [bundleName]: entry,
          },

          output:
            typeof output === 'string'
              ? {
                  libraryTarget: 'var',
                  library: output,
                }
              : output,

          externals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },

          resolve: {
            alias: getResolveAlias(true /*useLib*/),
          },
        },
        customConfig,
      ),
      onlyProduction,
    );
  },

  /**
   * Create a standard serve config for a legacy demo app.
   * Note that this assumes a base directory (for serving and output) of `dist/demo`.
   * @param {Partial<WebpackServeConfig>} customConfig - partial custom webpack config, merged into the full config
   * @param {string} [outputFolder] - output folder (package-relative) if not `dist/demo`
   * @returns {WebpackServeConfig}
   */
  createServeConfig(customConfig, outputFolder = 'dist/demo') {
    const outputPath = path.join(process.cwd(), outputFolder);
    return merge(
      {
        devServer: {
          // As of Webpack 5, this will open the browser at 127.0.0.1 by default
          host: 'localhost',
          port: 4322,
          static: outputPath,
        },

        mode: 'development',

        output: {
          filename: `[name].js`,
          libraryTarget: 'umd',
          path: outputPath,
        },

        resolve: {
          extensions: ['.ts', '.tsx', '.js'],
        },

        resolveLoader: {
          modules: module.exports.getResolveLoaderDirs(),
        },

        devtool: 'eval',

        module: {
          rules: [
            cssRule,
            {
              test: [/\.tsx?$/],
              use: {
                loader: 'ts-loader',
                options: {
                  experimentalWatchApi: true,
                  transpileOnly: true,
                },
              },
              exclude: [/node_modules/, /\.scss.ts$/, /\.test.tsx?$/],
            },
            {
              test: /\.scss$/,
              enforce: 'pre',
              exclude: [/node_modules/],
              use: [
                {
                  loader: '@microsoft/loader-load-themed-styles', // creates style nodes from JS strings
                },
                {
                  loader: 'css-loader', // translates CSS into CommonJS
                  options: {
                    esModule: false,
                    modules: true,
                    importLoaders: 2,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: ['autoprefixer'],
                    },
                  },
                },
                {
                  loader: 'sass-loader',
                },
              ],
            },
          ],
        },

        plugins: [
          ...(process.env.TF_BUILD || process.env.SKIP_TYPECHECK ? [] : [new ForkTsCheckerWebpackPlugin()]),
          ...(process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME ? [] : [new webpack.ProgressPlugin({})]),
        ],

        target,
      },
      customConfig,
    );
  },

  /**
   * Create a serve config for a package with a legacy demo app in the examples package at
   * `packages/react-examples/src/some-package/demo/index.tsx`.
   * Note that this assumes a base directory (for serving and output) of `dist/demo` and will
   * include `react-app-polyfill/ie11` for IE 11 support.
   * @returns {WebpackServeConfig}
   */
  createLegacyDemoAppConfig() {
    const packageName = path.basename(process.cwd());

    const reactExamples = path.join(gitRoot, 'packages/react-examples');
    const demoEntryInExamples = path.join(reactExamples, 'src', packageName, 'demo/index.tsx');

    if (!fs.existsSync(demoEntryInExamples)) {
      throw new Error(`${packageName} does not have a legacy demo app (expected location: ${demoEntryInExamples})`);
    }

    return module.exports.createServeConfig({
      entry: {
        'demo-app': ['react-app-polyfill/ie11', demoEntryInExamples],
      },

      output: {
        path: path.join(process.cwd(), 'dist/demo'),
        filename: 'demo-app.js',
      },

      resolve: {
        // Use the aliases for react-examples since the examples and demo may depend on some things
        // that the package itself doesn't (and it will include the aliases for all the package's deps)
        alias: getResolveAlias(false /*useLib*/, reactExamples),
        fallback: {
          path: require.resolve('path-browserify'),
        },
      },
    });
  },
};

function getPlugins(bundleName, isProduction, profile) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const plugins = [new webpack.DefinePlugin(getDefaultEnvironmentVars(isProduction))];

  if (isProduction && profile) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: bundleName + '.stats.html',
        openAnalyzer: false,
        generateStatsFile: false,
        logLevel: 'warn',
      }),
    );
  }

  return plugins;
}
