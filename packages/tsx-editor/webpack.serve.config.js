// @ts-check
const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { addMonacoWebpackConfig } = require('@uifabric/monaco-editor/scripts/addMonacoWebpackConfig');

const BUNDLE_NAME = 'demo-app';

module.exports = resources.createServeConfig(
  addMonacoWebpackConfig({
    entry: {
      [BUNDLE_NAME]: './src/demo/index.tsx',
    },

    output: {
      chunkFilename: `${BUNDLE_NAME}-[name].js`,
    },

    devServer: {
      writeToDisk: true, // for debugging
    },

    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },

    plugins: [/** @type {any} */ (new BundleAnalyzerPlugin())],

    resolve: {
      alias: {
        ...getResolveAlias(),
        '@uifabric/tsx-editor/dist': path.join(__dirname, 'dist'),
      },
    },
  }),
);
