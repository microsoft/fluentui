const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = () => {
  return {
    entry: ['react-app-polyfill/ie11', './src/index.tsx'],
    output: {
      filename: 'react-18-tests-v9.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../../tsconfig.base.json'),
        }),
      ],
      alias: {
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'swc-loader',
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
