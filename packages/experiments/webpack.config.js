const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');

const BUNDLE_NAME = 'experiments';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = [
  ...resources.createConfig(BUNDLE_NAME, IS_PRODUCTION, {
    entry: {
      [BUNDLE_NAME]: './lib/index.js',
    },
    externals: [{ react: 'React' }, { 'react-dom': 'ReactDOM' }],
    resolve: {
      alias: getResolveAlias(true),
    },
    output: {
      libraryTarget: 'var',
      library: 'FabricExperiments',
    },
  }),
  require('./webpack.serve.config'),
];
