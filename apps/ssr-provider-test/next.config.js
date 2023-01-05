const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpack: config => {
    config.module.rules.unshift(
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@griffel/webpack-loader',
            options: {
              babelOptions: {
                presets: ['next/babel'],
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    );
    config.resolve.extensions = ['.ts', '.tsx', '.js'];
    config.resolve.plugins.unshift(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../../tsconfig.base.json'),
      }),
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    };
    return config;
  },
};

// const path = require('path');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

// module.exports = () => {
//   return {
// entry: ['react-app-polyfill/ie11', './src/index.tsx'],
// output: {
//   filename: 'react-18-tests-v9.js',
//   path: path.resolve(__dirname, 'dist'),
// },
// resolve: {
//   extensions: ['.tsx', '.ts', '.js'],
//   plugins: [
//     new TsconfigPathsPlugin({
//       configFile: path.resolve(__dirname, '../../tsconfig.base.json'),
//     }),
//   ],
//   alias: {
//     react: path.resolve(__dirname, './node_modules/react'),
//     'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
//   },
// },
// module: {
//   rules: [
//     {
//       test: /\.(ts|tsx)?$/,
//       include: /node_modules/,
//       use: 'swc-loader',
//     },
//   ],
// },
// plugins: [
//   new HtmlWebpackPlugin({
//     templateContent: '<div id="root"></div>',
//   }),
// ],
//   };
// };

// {
//   "presets": ["@griffel", "@babel/preset-typescript", "next/babel"]
// }
