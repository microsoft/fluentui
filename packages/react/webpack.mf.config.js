/**
 * This webpack config creates an innerloop experience on port 2345 with the help of module federation feature
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const {
  getResolveAlias,
  resources: { createServeConfig },
} = require('@fluentui/scripts-webpack');

const { webpackMerge } = require('just-scripts');

// These shared are known vendor dependencies for the module federation plugin
const shared = {
  react: { singleton: true },
  'react-dom': { singleton: true },
};

// These rootComponents are part of the "public API" of the @fluentui/react module federated bundle
const rootComponents = fs
  .readdirSync(path.join(__dirname, 'src'))
  .filter(filename => filename[0].toUpperCase() === filename[0])
  .map(filename => filename.replace(/\.tsx?/, ''));
const rootComponentsExposes = {};
for (const component of rootComponents) {
  rootComponentsExposes[`./lib/${component}`] = `@fluentui/react/src/${component}`;
}

// TODO: fork-ts-checker-webpack-plugin needs to be taught about the resolve alias -> pathmapping in order for the type checking to work
process.env.SKIP_TYPECHECK = true;

const mfConfig = {
  output: {},
  entry: './empty-entrypoint.js',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  optimization: {
    concatenateModules: false,
  },
  module: {
    rules: [],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: 'fluentuiReact',
      filename: 'remoteEntry.js',
      exposes: {
        ...rootComponentsExposes,
        '.': '@fluentui/react/src/index',
        './lib/index': '@fluentui/react/src/index',
      },
      shared,
    }),
  ],
  resolve: {
    alias: getResolveAlias(),
  },
  devServer: {
    port: 2345,
    static: './dist',
  },
};

const metaConfig = webpackMerge.merge(createServeConfig(), mfConfig);

module.exports = metaConfig;
