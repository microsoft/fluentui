// @ts-check

const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
const { addMonacoWebpackConfig } = require('@uifabric/tsx-editor/scripts/addMonacoWebpackConfig');

const entryPointName = 'fabric-sitev5';

module.exports = resources.createServeConfig(
  addMonacoWebpackConfig({
    entry: {
      [entryPointName]: './src/root.tsx',
    },

    output: {
      chunkFilename: `${entryPointName}-[name].js`,
    },

    // The website config intentionally doesn't have React as an external because we bundle it
    // to ensure we get a consistent version.

    optimization: {
      removeAvailableModules: false,
    },

    resolve: {
      alias: getResolveAlias(),
    },
  }),
);
