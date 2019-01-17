const path = require('path');
const { createConfig } = require('../../scripts/jest/jest-resources');

const config = createConfig({
  snapshotSerializers: [path.resolve(__dirname)]
});

module.exports = config;
