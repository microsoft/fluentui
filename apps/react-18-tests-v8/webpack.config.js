const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { getResolveAlias } = require('@fluentui/scripts-webpack');

module.exports = () => {
  return {
    entry: ['react-app-polyfill/ie11', './src/index.tsx'],
    output: {
      filename: 'react-18-tests-v8.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        ...getResolveAlias(),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2019',
            },
          },
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
      new HtmlWebpackPlugin({
        templateContent: '<div id="root"></div>',
      }),
    ],
  };
};
