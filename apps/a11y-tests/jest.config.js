let { createConfig } = require('../../scripts/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'test-setup.js'))]
});

module.exports = config;
