const { createConfig } = require('../../scripts/jest/jest-resources');

module.exports = createConfig({
  testEnvironment: 'node',
  testRegex: '/__tests__/.*\\.test\\.ts$'
});
