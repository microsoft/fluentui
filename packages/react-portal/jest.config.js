const { createConfig } = require('@fluentui/scripts/jest/jest-resources');

const config = createConfig({
  snapshotSerializers: ['@fluentui/jest-serializer-make-styles'],
});

module.exports = config;
