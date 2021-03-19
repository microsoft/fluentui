const path = require('path');
const { createConfig } = require('@fluentui/scripts/jest/jest-resources');
module.exports = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
});
