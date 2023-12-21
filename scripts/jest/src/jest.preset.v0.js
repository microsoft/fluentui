const { getWorkspaceProjectsAliases } = require('@fluentui/scripts-monorepo');

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
    ...getWorkspaceProjectsAliases({
      type: 'jest',
      excludeProjects: excludedPackages,
    }),
    ...customConfig.moduleNameMapper,
  },
  // OLD format for migration to jest 29 - TODO: migrate to new format . https://jestjs.io/blog/2022/04/25/jest-28#future
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
});

module.exports = createConfig;
