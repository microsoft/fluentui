const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const PACKAGE_NAME = 'test-bundle-button';

module.exports = resources.createConfig(
  PACKAGE_NAME,
  true,
  {
    entry: './lib/index.js',

    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }

  });

