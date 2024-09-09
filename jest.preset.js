// @ts-check

const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');

const tsConfig = require('./tsconfig.base.json');

const tsPathAliases = pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
  prefix: `<rootDir>/${path.relative(process.cwd(), __dirname)}/`,
});

const isCI = Boolean(process.env.TF_BUILD);

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const baseConfig = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/lib-commonjs/', '/dist/'],
  testEnvironment: 'jsdom',
  moduleNameMapper: { ...tsPathAliases },
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  clearMocks: true,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  // OLD format for migration to jest 29 - TODO: migrate to new format . https://jestjs.io/blog/2022/04/25/jest-28#future
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
  /**
   *  **Local Machine:**
   *
   * jest is resource greedy. on local machine it will spawn workers into all your CPU threads which will provide additional heat up of your machine and everything else will be blocked.
   * Based on tests on local machine, 50% of CPU threads is the best value for local development ( also the fastest).
   *
   *  **CI:**
   *
   * based on testing not spawning additional workers and rely on task orchestrator (NX) parallelization is fastest on our CI env atm ( 8 Core machine, 16GB RAM)
   */
  maxWorkers: isCI ? 1 : '50%',
};

module.exports = {
  ...baseConfig,
  /* TODO: Update to latest Jest snapshotFormat
   * By default Nx has kept the older style of Jest Snapshot formats
   * to prevent breaking of any existing tests with snapshots.
   * It's recommend you update to the latest format.
   * You can do this by removing snapshotFormat property
   * and running tests with --update-snapshot flag.
   * Example: "nx affected --targets=test --update-snapshot"
   * More info: https://jestjs.io/docs/upgrading-to-jest29#snapshot-format
   */
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
};
