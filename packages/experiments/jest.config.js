let { createConfig } = require('../../scripts/tasks/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [
    path.resolve(__dirname, 'lib/common/tests.js')
  ],
  snapshotSerializers: [
    path.resolve(__dirname, './node_modules/@uifabric/jest-serializer-merge-styles')
  ]
});

module.exports = config;