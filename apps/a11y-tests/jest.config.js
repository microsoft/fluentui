// @ts-check
const { createConfig } = require('@fluentui/scripts/jest/jest-resources');
const path = require('path');

module.exports = createConfig({
  customConfig: {
    setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  },
});
