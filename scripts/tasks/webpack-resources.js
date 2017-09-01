const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack,

  createConfig(packageName, isProduction, customConfig, onlyProduction) {

    const resolveLoader = {
      modules: [
        path.resolve(__dirname, '../node_modules'),
        path.resolve(process.cwd(), 'node_modules')
      ]
    };

    const module = {
      noParse: [/autoit.js/],
      loaders: [
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          enforce: 'pre'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    };

    const stats = 'errors-only';
    const devtool = 'source-map';
    const configs = [];

    if (!onlyProduction) {
      configs.push(merge(
        {
          output: {
            filename: `[name].js`,
            path: path.resolve(process.cwd(), 'dist')
          },
          resolveLoader,
          module,
          stats,
          devtool,
          plugins: getPlugins(packageName, false)
        },
        customConfig
      ));
    }

    if (isProduction) {
      configs.push(merge({
        output: {
          filename: `[name].min.js`,
          path: path.resolve(process.cwd(), 'dist')
        },
        resolveLoader,
        module,
        stats,
        devtool,
        plugins: getPlugins(packageName, true)
      }, customConfig));
    }

    return configs;
  },

  createServeConfig(customConfig) {
    const WebpackNotifierPlugin = require('webpack-notifier');

    return merge(
      {
        devServer: {
          inline: true,
          port: 4321,
        },

        resolveLoader: {
          modules: [
            path.resolve(__dirname, '../node_modules'),
            path.resolve(process.cwd(), 'node_modules')
          ]
        },

        resolve: {
          extensions: ['.ts', '.tsx', '.js']
        },

        devtool: 'source-map',

        module: {
          loaders: [
            {
              test: [/\.json$/],
              enforce: 'pre',
              loader: 'json-loader',
              exclude: [
                /node_modules/
              ]
            },
            {
              test: [/\.tsx?$/],
              loader: 'awesome-typescript-loader',
              exclude: [
                /node_modules/,
                /\.scss.ts$/
              ]
            },
            {
              test: /\.scss$/,
              enforce: 'pre',
              exclude: [
                /node_modules/
              ],
              use: [
                {
                  loader: "@microsoft/loader-load-themed-styles", // creates style nodes from JS strings
                },
                {
                  loader: "css-loader", // translates CSS into CommonJS
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
                    plugins: function () {
                      return [
                        require('autoprefixer')
                      ];
                    }
                  }
                },
                {
                  loader: 'sass-loader',
                }
              ]
            }
          ]
        },

        plugins: [
          new WebpackNotifierPlugin()
        ]
      },
      customConfig
    );
  }

};

function merge(obj1, obj2) {
  const merged = Object.assign({}, obj1);

  for (prop in obj2) {
    const sourceValue = obj2[prop];
    const targetValue = obj1[prop];

    if (sourceValue && Array.isArray(sourceValue) && targetValue && Array.isArray(targetValue)) {
      merged[prop] = targetValue.concat(sourceValue);
    } else if (typeof targetValue === 'object' && typeof sourceValue === 'object') {
      merged[prop] = merge(targetValue, sourceValue);
    } else {
      merged[prop] = sourceValue;
    }
  }

  return merged;
}

function getPlugins(
  bundleName,
  isProduction
) {
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const plugins = [];

  if (isProduction) {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true,
          warnings: false
        }
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: bundleName + '.stats.html',
        openAnalyzer: false,
        generateStatsFile: true,
        statsFilename: bundleName + '.stats.json',
        logLevel: 'warn'
      })
    );
  }

  return plugins;
}