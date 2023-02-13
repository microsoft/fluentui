const { createV8Config: createConfig } = require('@fluentui/scripts-jest');

const config = createConfig({
  setupFiles: ['./config/tests.js'],
  snapshotSerializers: ['@griffel/jest-serializer'],
});

module.exports = config;
