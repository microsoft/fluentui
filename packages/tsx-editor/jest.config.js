let { createConfig, resolveMergeStylesSerializer } = require('@uifabric/build/jest/jest-resources');
let path = require('path');

const config = createConfig(
  {
    setupFiles: [path.join(__dirname, 'config', 'tests.js')],

    moduleNameMapper: {
      'office-ui-fabric-react/lib/(.*)$': 'office-ui-fabric-react/lib-commonjs/$1'
    },

    snapshotSerializers: [resolveMergeStylesSerializer()]
  },
  true /*useMonaco*/
);

module.exports = config;
