let { createConfig, resolveMergeStylesSerializer } = require('@uifabric/build/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],

  moduleNameMapper: {
    '@fluentui/date-time-utilities/lib/(.*)$': '@fluentui/date-time-utilities/lib-commonjs/$1',
    '@fluentui/react-button/lib/(.*)$': '@fluentui/react-button/lib-commonjs/$1',
    '@fluentui/react-focus/lib/(.*)$': '@fluentui/react-focus/lib-commonjs/$1',
    '@uifabric/react-hooks/lib/(.*)$': '@uifabric/react-hooks/lib-commonjs/$1',
    '@uifabric/utilities/lib/(.*)$': '@uifabric/utilities/lib-commonjs/$1',
    'office-ui-fabric-react/lib/(.*)$': 'office-ui-fabric-react/lib-commonjs/$1',
    'office-ui-fabric-react$': 'office-ui-fabric-react/lib-commonjs/',
    // These mappings allow Jest to run snapshot tests against Example files.
    '@fluentui/react-next/lib/(.*)$': '<rootDir>/src/$1',
    '@fluentui/react-next$': '<rootDir>/src/',
  },

  snapshotSerializers: [resolveMergeStylesSerializer()],
});

module.exports = config;
