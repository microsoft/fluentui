// @ts-check
const { createConfig } = require('@fluentui/scripts/jest/jest-resources');

module.exports = createConfig({
  customConfig: {
    snapshotSerializers: [__dirname],
  },
});
