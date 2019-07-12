let { createConfig } = require('@uifabric/build/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],

  moduleNameMapper: {
    // These mappings allow Jest to run snapshot tests against Example files.
    'office-ui-fabric-react/lib/(.*)$': '<rootDir>/../office-ui-fabric-react/src/$1'
  }
});

module.exports = config;
