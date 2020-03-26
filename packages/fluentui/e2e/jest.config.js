const commonConfig = require('@uifabric/build/jest');

module.exports = {
  ...commonConfig,
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@uifabric/build/monorepo/findGitRoot')(),
  }),
  name: 'e2e',
  testRegex: '.*-test\\.tsx?$',
  setupFilesAfterEnv: ['./setup.test.ts'],
};
