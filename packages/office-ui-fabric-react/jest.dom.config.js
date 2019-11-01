let { createConfig } = require('@uifabric/build/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],

  testRegex: '(/__tests__/.*|\\.(test|spec))\\.dom\\.(ts|tsx)$',

  preset: 'jest-puppeteer'
});

module.exports = config;
