let { createConfig, resolveMergeStylesSerializer } = require('@uifabric/build/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],

  moduleNameMapper: {
    '@fluentui/react-avatar/lib/(.*)$': '@fluentui/react-avatar/lib-commonjs/$1',
    '@fluentui/react-button/lib/(.*)$': '@fluentui/react-button/lib-commonjs/$1',
    '@fluentui/react-checkbox/lib/(.*)$': '@fluentui/react-checkbox/lib-commonjs/$1',
    '@fluentui/react-focus/lib/(.*)$': '@fluentui/react-focus/lib-commonjs/$1',
    '@fluentui/react-image/lib/(.*)$': '@fluentui/react-image/lib-commonjs/$1',
    '@fluentui/react-link/lib/(.*)$': '@fluentui/react-link/lib-commonjs/$1',
    '@fluentui/react-next/lib/(.*)$': '@fluentui/react-next/lib-commonjs/$1',
    '@fluentui/react-slider/lib/(.*)$': '@fluentui/react-slider/lib-commonjs/$1',
    '@fluentui/react-tabs/lib/(.*)$': '@fluentui/react-tabs/lib-commonjs/$1',
    '@fluentui/react-toggle/lib/(.*)$': '@fluentui/react-toggle/lib-commonjs/$1',
    '@uifabric/date-time/lib/(.*)$': '@uifabric/date-time/lib-commonjs/$1',
    '@uifabric/experiments/lib/(.*)$': '@uifabric/experiments/lib-commonjs/$1',
    '@uifabric/react-hooks/lib/(.*)$': '@uifabric/react-hooks/lib-commonjs/$1',
    '@uifabric/react-cards/lib/(.*)$': '@uifabric/react-cards/lib-commonjs/$1',
    '@uifabric/utilities/lib/(.*)$': '@uifabric/utilities/lib-commonjs/$1',
    'office-ui-fabric-react/lib/(.*)$': 'office-ui-fabric-react/lib-commonjs/$1',
    'office-ui-fabric-react$': 'office-ui-fabric-react/lib-commonjs/',
    '@fluentui/examples/lib/(.*)$': '@fluentui/examples/lib-commonjs/$1',
  },

  snapshotSerializers: [resolveMergeStylesSerializer()],
});

module.exports = config;
