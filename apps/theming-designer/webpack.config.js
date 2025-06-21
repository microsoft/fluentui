// @ts-check
const path = require('node:path');
const { resources } = require('@fluentui/scripts-webpack');

const BUNDLE_NAME = 'theming-designer';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
  entry: {
    [BUNDLE_NAME]: ['react-app-polyfill/ie11', './lib/index.js'],
  },
  resolve: {
    alias: {
      // react-monaco-editor dynamically loads @types/react via proprietary webpack require.ensure,
      // this doesn't work starting @types/react@17.0.48 as the types package introduced Export Maps
      '@types/react/index.d.ts': path.resolve(__dirname, '../../node_modules/@types/react/index.d.ts'),
    },
  },

  output: {
    libraryTarget: 'var',
    library: 'Fabric',
  },
});
