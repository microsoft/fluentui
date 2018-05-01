const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const PACKAGE_NAME = 'test-bundle-button';

const entry = {
  'Button': './node_modules/office-ui-fabric-react/lib/Button.js'
};

module.exports = resources.createConfig(
  PACKAGE_NAME,
  true,
  {
    entry,

    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }

  });
