const { createV8Config: createConfig } = require('@fluentui/scripts-jest');

const config = createConfig({
  setupFiles: ['./config/tests.js'],
  snapshotSerializers: ['@fluentui/jest-serializer-merge-styles'],
  // Keeps Jest from using too much memory as GC gets invoked more often, makes tests slower
  // https://stackoverflow.com/a/75857711
  workerIdleMemoryLimit: '1024MB',
});

module.exports = config;
