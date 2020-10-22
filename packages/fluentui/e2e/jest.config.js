const commonConfig = require('@fluentui/scripts/jest');

module.exports = {
  ...commonConfig,
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@fluentui/scripts/monorepo/findGitRoot')(),
  }),
  name: 'e2e',
  testRegex: '.*-test\\.tsx?$',
  setupFilesAfterEnv: ['./setup.test.ts'],
};
