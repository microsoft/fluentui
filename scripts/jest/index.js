const { getLernaAliases, workspaceRoot } = require('../monorepo');

// northstar packages should pull these from npm, not the repo
const excludedPackages = ['@fluentui/dom-utilities'];

module.exports = (/** @type {import('@jest/types').Config.InitialOptions} */ customConfig) => ({
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupFilesAfterEnv: [`${__dirname}/setupTests.js`],
  testRegex: '/test/.*-test\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  verbose: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  ...customConfig,
  moduleNameMapper: {
    ...getLernaAliases({
      type: 'jest',
      excludedPackages,
      directory: workspaceRoot,
    }),
    ...customConfig.moduleNameMapper,
  },
});
