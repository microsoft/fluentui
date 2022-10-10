let { createConfig, resolveMergeStylesSerializer } = require('@fluentui/scripts/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: [resolveMergeStylesSerializer(), 'enzyme-to-json/serializer'],
  transform: {},
  moduleNameMapper: {
    // '^uuid$': '<rootDir>/node_modules/uuid/dist/index.js',
    '^d3-scale$': require.resolve('d3-scale'),
  },
});

module.exports = config;
