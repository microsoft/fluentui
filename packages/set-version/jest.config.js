let { createConfig } = require('../../scripts/tasks/jest-resources');

const config = createConfig({
  setupFiles: [],
  moduleNameMapper: {},
  snapshotSerializers: []
});

module.exports = config;
