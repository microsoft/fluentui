let { createConfig } = require('../../scripts/jest/jest-resources');

const config = createConfig({
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.dom\\.(ts|tsx)$',

  preset: 'jest-puppeteer',
  setupTestFrameworkScriptFile: 'expect-puppeteer'
});

module.exports = config;
