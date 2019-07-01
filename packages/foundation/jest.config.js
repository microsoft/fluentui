let { createConfig, mergeStylesSerializer } = require('../../scripts/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: [mergeStylesSerializer]
});

module.exports = config;
