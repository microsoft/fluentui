let { createConfig, resolveMergeStylesSerializer } = require('@fluentui/scripts/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: [resolveMergeStylesSerializer(), 'enzyme-to-json/serializer'],
});

module.exports = config;
