/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// @ts-check
const path = require('path');
const { startDevServer } = require('@cypress/webpack-dev-server');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

/**
 * Cypress Webpack devServer that uses esbuild-loader for speed,
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  const tsPaths = new TsconfigPathsPlugin({
    configFile: path.resolve(__dirname, '../../../tsconfig.base.json'),
  });
  /** @type import("webpack").Configuration */
  const webpackConfig = {
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      plugins: [tsPaths],
    },
    mode: 'development',
    devtool: false,
    output: {
      publicPath: '/',
      chunkFilename: '[name].bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'es2019',
          },
        },
      ],
    },
  };

  on('dev-server:start', options => startDevServer({ options, webpackConfig }));
  return config;
};
