/// <reference types="cypress" />
// ***********************************************************
// This file is used to load Cypress plugins. More info:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// @ts-check
const fs = require('fs');
const jju = require('jju');
const path = require('path');
const { startDevServer } = require('@cypress/webpack-dev-server');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const applyV8WebpackConfig = require('../../storybook/webpack.config');

/**
 * Cypress Webpack devServer that uses esbuild-loader for speed in v9
 * (still uses ts-loader in v8)
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // Enable sourcemaps for interactive debugging (config.env.mode is defined in ../index.js)
  const devtool = config.env.mode === 'open' ? 'eval' : false;

  /** @type {import("webpack").Configuration} */
  const webpackConfig = {
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    },
    mode: 'development',
    devtool,
    output: {
      publicPath: '/',
      chunkFilename: '[name].bundle.js',
    },
    module: {
      rules: [],
    },
  };

  if (path.basename(process.cwd()) === 'react-examples') {
    // For v8, reuse the storybook webpack config helper to add required options for building v8,
    // including the `resolve.alias` config that's currently REQUIRED to make tests re-run when a
    // component file in @fluentui/react is modified while running in open mode.
    // (This is different than the v9 config because v8 doesn't use tsconfig paths, so the only way
    // it can respond to file edits is by using `resolve.alias`, which doesn't work with esbuild.)
    applyV8WebpackConfig(webpackConfig);
  } else {
    // For v9, use tsconfig paths and esbuild-loader
    const tsConfigBasePath = path.resolve(__dirname, '../../../tsconfig.base.json');
    /** @type {import("../../../tools/types").TsConfig} */
    const tsConfigBase = jju.parse(fs.readFileSync(tsConfigBasePath).toString());
    const tsPaths = new TsconfigPathsPlugin({
      configFile: tsConfigBasePath,
    });

    webpackConfig.resolve.plugins = [tsPaths];
    webpackConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx',
        target: tsConfigBase.compilerOptions.target,
      },
    });
  }

  // Used by cypress https://github.com/cypress-io/cypress/blob/develop/npm/react/examples/webpack-options/cypress/plugins/index.js
  // this is required to load commonjs babel plugin
  process.env.BABEL_ENV = 'test';

  /** @type {import('@cypress/webpack-dev-server').ResolvedDevServerConfig['close'] | undefined} */
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
