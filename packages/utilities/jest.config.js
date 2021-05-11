let path = require('path');
let { createConfig, resolveMergeStylesSerializer } = require('@fluentui/scripts/jest/jest-resources');
module.exports = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: [resolveMergeStylesSerializer()],
});
