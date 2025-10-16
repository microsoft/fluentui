const { createV8Config: createConfig } = require('@fluentui/scripts-jest');

module.exports = createConfig({
  setupFilesAfterEnv: ['./config/tests.js'],
  snapshotSerializers: ['@fluentui/jest-serializer-merge-styles'],
});
