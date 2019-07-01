let path = require('path');
let { createConfig, mergeStylesSerializer } = require('../../scripts/jest/jest-resources');
module.exports = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: [mergeStylesSerializer]
});
