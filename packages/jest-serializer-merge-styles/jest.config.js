const path = require('path');
const { createConfig } = require('@fluentui/scripts/jest/jest-resources');

const config = createConfig({
  snapshotSerializers: [path.join(__dirname, 'src', 'index.ts')],
});

module.exports = config;
