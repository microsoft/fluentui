const { createConfig } = require('@uifbaric/build/jest/jest-resources');

module.exports = createConfig({
  testEnvironment: 'node',
  testRegex: '/__tests__/.*\\.test\\.ts$'
});
