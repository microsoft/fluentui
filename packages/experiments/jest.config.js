let { createConfig, resolveMergeStylesSerializer } = require('@uifabric/build/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],

  moduleNameMapper: {
    '@uifabric/foundation/lib/(.*)$': '@uifabric/foundation/lib-commonjs/$1',
    'office-ui-fabric-react/lib/(.*)$': 'office-ui-fabric-react/lib-commonjs/$1',
    '@uifabric/experiments/lib/(.*)': '<rootDir>/src/$1'
  },

  snapshotSerializers: [resolveMergeStylesSerializer()]
});

module.exports = config;
