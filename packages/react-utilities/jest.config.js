let { createConfig } = require('@fluentui/scripts/jest/jest-resources');
let path = require('path');

const config = createConfig({
  moduleNameMapper: require('lerna-alias').jest(),
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
});

module.exports = config;
