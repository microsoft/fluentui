let path = require('path');
let { createConfig } = require('../../scripts/tasks/jest-resources');
module.exports = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: [path.resolve(__dirname, './node_modules/@uifabric/jest-serializer-merge-styles')]
});
