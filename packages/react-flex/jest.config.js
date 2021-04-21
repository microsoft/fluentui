const { createConfig } = require('@fluentui/scripts/jest/jest-resources');
const path = require('path');

const config = createConfig({
  setupFilesAfterEnv: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: ['@fluentui/jest-serializer-make-styles'],
});

module.exports = config;
