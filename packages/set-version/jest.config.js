let { createConfig } = require('@uifbaric/build/jest/jest-resources');

const config = createConfig({
  setupFiles: [],
  moduleNameMapper: {},
  snapshotSerializers: []
});

module.exports = config;
