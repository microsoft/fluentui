// @ts-check
const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
const { addMonacoWebpackConfig } = require('@fluentui/monaco-editor/scripts/addMonacoWebpackConfig');

const BUNDLE_NAME = 'react-monaco-editor';
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
      library: 'FluentUIReactMonacoEditor',
    },

    externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],

    resolve: {
      alias: {
        ...getResolveAlias(true),
        '@fluentui/react-monaco-editor/dist': path.join(__dirname, 'dist'),
      },
    },
  }),
);
