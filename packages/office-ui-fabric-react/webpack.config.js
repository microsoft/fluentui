let path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const BUNDLE_NAME = 'office-ui-fabric-react';

module.exports = resources.createConfig(
  BUNDLE_NAME,
  isProduction,
  {
    entry: {
      [BUNDLE_NAME]: './lib/index.js'
    },

    output: {
      libraryTarget: 'var',
      library: 'Fabric'
    },

    externals: [
      {
        'react': 'React',
      },
      {
        'react-dom': 'ReactDOM'
      }
    ]
  }
);
