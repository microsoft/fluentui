const { createConfig, resolveMergeStylesSerializer } = require('@fluentui/scripts/jest/jest-resources');
const path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],

  snapshotSerializers: [resolveMergeStylesSerializer()],

  moduleNameMapper: {
    '@storybook/addon-docs/blocks$': '@storybook/addon-docs/dist/cjs/blocks',
  },
});

module.exports = config;
