let { createConfig, resolveMergeStylesSerializer } = require('@uifabric/build/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],

  moduleNameMapper: {
    'office-ui-fabric-react/lib/(.*)$': 'office-ui-fabric-react/lib-commonjs/$1',
    '@uifabric/date-time-utilities/lib/(.*)$': '@uifabric/date-time-utilities/lib-commonjs/$1',
  },

  snapshotSerializers: [resolveMergeStylesSerializer()],
});

module.exports = config;
