const lernaAlias = require('../lernaAliasNorthstar');
const findGitRoot = require('../monorepo/findGitRoot');

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
    ...lernaAlias.jest({
      directory: findGitRoot(),
    }),
    ...customConfig.moduleNameMapper,
  },
});
