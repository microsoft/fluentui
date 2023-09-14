const path = require('path');
const { createV8Config: createConfig } = require('@fluentui/scripts-jest');

const config = createConfig({
  snapshotSerializers: [path.join(__dirname, 'src', 'index.ts')],
});

module.exports = config;
