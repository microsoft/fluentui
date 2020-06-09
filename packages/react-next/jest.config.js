let { createConfig, resolveMergeStylesSerializer } = require('@uifabric/build/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],

  moduleNameMapper: {
    '@fluentui/react-focus/lib/(.*)$': '@fluentui/react-focus/lib-commonjs/$1',
    '@uifabric/react-hooks/lib/(.*)$': '@uifabric/react-hooks/lib-commonjs/$1',
    '@uifabric/utilities/lib/(.*)$': '@uifabric/utilities/lib-commonjs/$1',
    // These mappings allow Jest to run snapshot tests against Example files.
    'office-ui-fabric-react/lib/(.*)$': '<rootDir>/../office-ui-fabric-react/src/$1',
    'office-ui-fabric-react$': '<rootDir>/../office-ui-fabric-react/src/',
  },

  snapshotSerializers: [resolveMergeStylesSerializer()],
});

module.exports = config;
