let path = require('path');
let { createConfig, resolveMergeStylesSerializer } = require('@uifabric/build/jest/jest-resources');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'src', 'setupTests.js'))],

  moduleNameMapper: {
    '@fluentui/react-conformance/lib/(.*)$': '@fluentui/react-conformance/lib-commonjs/$1',
    '@fluentui/react-conformance$': '@fluentui/react-conformance/lib-commonjs/index',
  },

  snapshotSerializers: [resolveMergeStylesSerializer()],
});

module.exports = config;
