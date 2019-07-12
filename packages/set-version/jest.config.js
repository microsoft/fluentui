let { createConfig } = require('../../scripts/jest/jest-resources');

const config = createConfig({
  setupFiles: [],
  moduleNameMapper: {},
  snapshotSerializers: []
});

module.exports = config;
