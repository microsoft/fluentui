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
const fs = require('fs');
const { startDevServer } = require('@cypress/webpack-dev-server');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

/**
 * Cypress Webpack devServer that uses esbuild-loader for speed,
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  const tsConfigBasePath = path.resolve(__dirname, '../../../tsconfig.base.json');
  /**
   * @type {import("../../../tools/types").TsConfig}
   */
  const tsConfigBase = JSON.parse(fs.readFileSync(tsConfigBasePath).toString());
  const tsPaths = new TsconfigPathsPlugin({
    configFile: tsConfigBasePath,
  });
  /** @type {import("webpack").Configuration} */
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
            target: tsConfigBase.compilerOptions.target,
          },
        },
      ],
    },
  };

  // Used by cypress https://github.com/cypress-io/cypress/blob/develop/npm/react/examples/webpack-options/cypress/plugins/index.js
  // this is required to load commonjs babel plugin
  process.env.BABEL_ENV = 'test';

  /**
   * Cypress Webpack devServer that uses esbuild-loader for speed,
   * @type {import('@cypress/webpack-dev-server').ResolvedDevServerConfig['close'] | undefined}
   */
  let closeServer = undefined;
  on('after:run', () => {
    // Generally isn't necessary, but sometimes unexpected errors can cause the
    // dev server to hang
    if (closeServer) {
      closeServer();
    }
  });

  on('dev-server:start', options => {
    return startDevServer({ options, webpackConfig }).then(server => {
      closeServer = server.close;
      return server;
    });
  });
  return config;
};
