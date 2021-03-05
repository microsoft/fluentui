const commonConfig = require('@fluentui/scripts/jest');

module.exports = commonConfig({
  name: 'e2e',
  testRegex: '.*-test\\.tsx?$',
  setupFilesAfterEnv: ['./setup.test.ts'],
});
