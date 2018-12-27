const { createConfig } = require('../../scripts/tasks/jest-resources');
const path = require('path');

const config = createConfig({
  snapshotSerializers: [path.resolve(__dirname)]
});

module.exports = config;
