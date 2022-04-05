// @ts-check

const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const tsConfig = require('./tsconfig.base.json');

const tsPathAliases = pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
  prefix: `<rootDir>/${path.relative(process.cwd(), __dirname)}/`,
});

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const baseConfig = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/lib-commonjs/', '/dist/'],
  moduleNameMapper: { ...tsPathAliases },
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  clearMocks: true,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};

module.exports = { ...baseConfig };
