const path = require('node:path');

const { getWorkspaceProjectsAliases, workspaceRoot } = require('@fluentui/scripts-monorepo');
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
  setupFilesAfterEnv: [`${__dirname}/setupTests.js`],
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
    /**
     * NOTE: need to explicitly pin react deps to v17, because yarn v1 incorrectly installs react and react-dom in some v0 packages
     */
    '^react-is$': path.join(workspaceRoot, 'packages/fluentui/react-northstar/node_modules/react-is'),
    '^react$': path.join(workspaceRoot, 'packages/fluentui/react-northstar/node_modules/react'),
    '^react-dom$': path.join(workspaceRoot, 'packages/fluentui/react-northstar/node_modules/react-dom'),
    '^react-dom/(.*)$': path.join(workspaceRoot, 'packages/fluentui/react-northstar/node_modules/react-dom/$1'),
  },
  // OLD format for migration to jest 29 - TODO: migrate to new format . https://jestjs.io/blog/2022/04/25/jest-28#future
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
});

module.exports = createConfig;
