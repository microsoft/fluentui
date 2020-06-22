// @ts-check
const { createConfig } = require('@uifabric/build/jest/jest-resources');

module.exports = createConfig({
  globalSetup: './config/timezone-setup.js',
});
