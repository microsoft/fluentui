const { createV8Config: createConfig } = require('@fluentui/scripts-jest');

const config = createConfig({
  setupFiles: ['./config/tests.js'],
  snapshotSerializers: ['@fluentui/jest-serializer-merge-styles', 'enzyme-to-json/serializer'],
});

module.exports = config;
