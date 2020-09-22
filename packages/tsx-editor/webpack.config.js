// @ts-check
const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
const { addMonacoWebpackConfig } = require('@uifabric/monaco-editor/scripts/addMonacoWebpackConfig');

const BUNDLE_NAME = 'tsx-editor';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(
  BUNDLE_NAME,
  IS_PRODUCTION,
  addMonacoWebpackConfig({
    entry: {
      [BUNDLE_NAME]: './lib/index.js',
    },

    output: {
      libraryTarget: 'var',
      library: 'FabricTsxEditor',
    },

    externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

    resolve: {
      alias: {
        ...getResolveAlias(),
        '@uifabric/tsx-editor/dist': path.join(__dirname, 'dist'),
      },
    },
  }),
);
