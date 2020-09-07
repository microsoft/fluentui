const commonConfig = require('@uifabric/build/jest');

module.exports = {
  ...commonConfig,
  globalSetup: 'jest-environment-puppeteer/setup',
  globalTeardown: 'jest-environment-puppeteer/teardown',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@uifabric/build/monorepo/findGitRoot')(),
  }),
  name: 'e2e',
  testEnvironment: 'jest-environment-puppeteer',
  testRegex: '.*-test\\.tsx?$',
  setupFilesAfterEnv: ['./setup.test.ts'],
};
