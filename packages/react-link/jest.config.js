let { createConfig } = require('@fluentui/scripts/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: ['@fluentui/jest-serializer-make-styles'],
});

module.exports = config;
