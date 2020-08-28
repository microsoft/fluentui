const { createConfig } = require('@uifabric/build/jest/jest-resources');
const path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
});

module.exports = config;
