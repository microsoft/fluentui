const path = require('path');
const { createConfig } = require('@fluentui/scripts/jest/jest-resources');

const config = createConfig({
  snapshotSerializers: [path.join(path.resolve(__dirname), 'src', 'index.ts')],
});

module.exports = config;
