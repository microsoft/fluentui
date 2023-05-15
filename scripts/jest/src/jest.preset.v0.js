const { getLernaAliases, workspaceRoot } = require('@fluentui/scripts-monorepo');

// northstar packages should pull these from npm, not the repo
const excludedPackages = ['@fluentui/dom-utilities'];

const createConfig = (/** @type {import('@jest/types').Config.InitialOptions} */ customConfig) => ({
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupFilesAfterEnv: [`${__dirname}/v0/setupTests.js`],
  testRegex: '/test/.*-test\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  verbose: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  testEnvironment: 'jsdom',
  restoreMocks: true,
  clearMocks: true,
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

module.exports = createConfig;
