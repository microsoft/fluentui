const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const resolve = require('resolve');
const merge = require('../tasks/merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const webpackVersion = require('webpack/package.json').version;
console.log(`Webpack version: ${webpackVersion}`);

const cssRule = {
  test: /\.css$/,
  include: /node_modules/,
  use: ['style-loader', 'css-loader']
};

let isValidEnv = false;

function validateEnv() {
  if (!isValidEnv) {
    try {
      const resolvedPolyfill = resolve.sync('react-app-polyfill/ie11', { basedir: process.cwd() });
      isValidEnv = !!resolvedPolyfill;
    } catch (e) {
      console.error('Please make sure the package "react-app-polyfill" is in the package.json dependencies');
      process.exit(1);
    }
  }
}

function shouldPrepend(config) {
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
  const excludedProjects = ['perf-test', 'test-bundles'];
  const exportedAsBundle = config.output && (config.output.libraryTarget === 'umd' || config.output.libraryTarget === 'var');
  const hasReactAsDependency =
    (packageJson.dependencies && Object.keys(packageJson.dependencies).includes('react')) ||
    (packageJson.devDependencies && Object.keys(packageJson.devDependencies).includes('react'));
  return !exportedAsBundle && hasReactAsDependency && !excludedProjects.includes(packageJson.name);
}

/**
 * Prepends the entry points with a react 16 compatible polyfill but only for sites that have react as a dependency
 */
function createEntryWithPolyfill(entry, config) {
  if (shouldPrepend(config) && entry) {
    validateEnv();

    const polyfill = 'react-app-polyfill/ie11';
    if (typeof entry === 'string') {
      return [polyfill, entry];
    } else if (Array.isArray(entry)) {
      return [polyfill, ...entry];
    } else if (typeof entry === 'object') {
      const newEntry = { ...entry };

      Object.keys(entry).forEach(entryPoint => {
        newEntry[entryPoint] = createEntryWithPolyfill(entry[entryPoint], config);
      });

      return newEntry;
    }
  }

  return entry;
}

module.exports = {
  webpack,

  /**
   * @param packageName {string} - name of the package
   * @param isProduction {boolean} - whether it's a production build
   * @param customConfig {Partial<webpack.Configuration>} - partial custom webpack config, merged into each full config object
   * @param [onlyProduction] {boolean} - whether to only generate the production config
   * @param [excludeSourceMaps] {boolean} - whether to skip generating source maps
   * @returns {webpack.Configuration[]} array of configs
   */
  createConfig(packageName, isProduction, customConfig, onlyProduction, excludeSourceMaps) {
    const module = {
      noParse: [/autoit.js/],
      rules: excludeSourceMaps
        ? [cssRule]
        : [
            {
              test: /\.js$/,
              use: 'source-map-loader',
              enforce: 'pre'
            },
            cssRule
          ]
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
              pathinfo: false
            },
            module,
            devtool,
            plugins: getPlugins(packageName, false)
          },
          customConfig
        )
      );
    }

    if (isProduction) {
      configs.push(
        merge(
          {
            mode: 'production',
            output: {
              filename: `[name].min.js`,
              path: path.resolve(process.cwd(), 'dist')
            },

            module,
            devtool: excludeSourceMaps ? undefined : devtool,
            plugins: getPlugins(packageName, true)
          },
          customConfig
        )
      );
    }

    for (let config of configs) {
      config.entry = createEntryWithPolyfill(config.entry, config);
    }

    return configs;
  },

  createServeConfig(customConfig) {
    const config = merge(
      {
        devServer: {
          inline: true,
          port: 4322,
          contentBase: path.resolve(process.cwd(), 'dist')
        },

        mode: 'development',

        resolve: {
          extensions: ['.ts', '.tsx', '.js']
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
                  transpileOnly: true
                }
              },
              exclude: [/node_modules/, /\.scss.ts$/, /\.test.tsx?$/]
            },
            {
              test: /\.scss$/,
              enforce: 'pre',
              exclude: [/node_modules/],
              use: [
                {
                  loader: '@microsoft/loader-load-themed-styles' // creates style nodes from JS strings
                },
                {
                  loader: 'css-loader', // translates CSS into CommonJS
                  options: {
                    modules: true,
                    importLoaders: 2,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    minimize: false
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: function() {
                      return [require('autoprefixer')];
                    }
                  }
                },
                {
                  loader: 'sass-loader'
                }
              ]
            }
          ]
        },

        plugins: [
          // TODO: will investigate why this doesn't work on mac
          // new WebpackNotifierPlugin(),
          ...(!process.env.TF_BUILD ? [new ForkTsCheckerWebpackPlugin()] : []),
          ...(process.env.TF_BUILD ? [] : [new webpack.ProgressPlugin()]),
          ...(!process.env.TF_BUILD && process.env.cached ? [new HardSourceWebpackPlugin()] : [])
        ]
      },
      customConfig
    );

    config.entry = createEntryWithPolyfill(config.entry, config);
    return config;
  }
};

function getPlugins(bundleName, isProduction) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  const plugins = [];

  if (isProduction) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: bundleName + '.stats.html',
        openAnalyzer: false,
        generateStatsFile: true,
        statsOptions: {
          source: false,
          reasons: false,
          chunks: false
        },
        statsFilename: bundleName + '.stats.json',
        logLevel: 'warn'
      })
    );
  }

  return plugins;
}
