const path = require('node:path');

const { getWorkspaceProjectsAliases } = require('@fluentui/scripts-monorepo');
const { findConfig } = require('@fluentui/scripts-utils');

const { workersConfig } = require('./shared');

// northstar packages should pull these from npm, not the repo
const excludedPackages = ['@fluentui/dom-utilities'];

const packageJsonPath = findConfig('package.json') ?? '';
const packageRoot = path.dirname(packageJsonPath);

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
  ...workersConfig,
  ...customConfig,
  // necessary to properly consume non hoisted dependencies like react 17, enzyme etc
  moduleDirectories: [path.resolve(packageRoot, 'node_modules'), 'node_modules'],
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
