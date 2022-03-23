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
 * Cypress Webpack devServer includes Babel env preset,
 * but to transpile JSX code we need to add Babel React preset
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
    // TODO: update with valid configuration for your components
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

  process.env.BABEL_ENV = 'test'; // this is required to load commonjs babel plugin
  on('dev-server:start', options => startDevServer({ options, webpackConfig }));

  // if adding code coverage, important to return updated config
  return config;
};
