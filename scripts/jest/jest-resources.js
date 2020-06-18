// @ts-check

const path = require('path');
const merge = require('../tasks/merge');
const resolve = require('resolve');
const { resolveCwd } = require('just-scripts');
const { findRepoDeps } = require('../monorepo/index');
const findConfig = require('../find-config');

const packageRoot = path.dirname(findConfig('package.json'));

const jestAliases = () => {
  // Get deps of the current package within the repo (will include the package itself)
  const packageDeps = findRepoDeps();

  const aliases = {};

  for (const { packageJson, packagePath } of packageDeps) {
    const packageName = packageJson.name;
    if (packagePath === process.cwd()) {
      // Special aliases to look at src for the current package
      aliases[`^${packageName}$`] = '<rootDir>/src/';
      aliases[`^${packageName}/lib/(.*)$`] = '<rootDir>/src/$1';
    } else if (packageJson.main.includes('lib-commonjs')) {
      // Map package root and lib imports to the commonjs version
      const main = `${packageName}/${packageJson.main.replace('.js', '')}`;
      aliases[`^${packageName}$`] = main;
      aliases[`^${packageName}/lib/(.*)$`] = main.replace('index', '$1');
    }
  }
  console.dir(aliases);

  return aliases;
};

module.exports = {
  resolveMergeStylesSerializer: () => resolveCwd('@uifabric/jest-serializer-merge-styles'),
  createRawConfig: () => ({
    rootDir: 'lib',
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.js$',
  }),
  jestAliases,
  createConfig: customConfig =>
    merge(
      {
        moduleNameMapper: {
          'ts-jest': resolve.sync('ts-jest'),
          '\\.(scss)$': path.resolve(__dirname, 'jest-style-mock.js'),
          KeyCodes: path.resolve(__dirname, 'jest-mock.js'),
          ...jestAliases(),
        },

        transform: {
          '.(ts|tsx)': resolve.sync('ts-jest/dist'),
        },

        transformIgnorePatterns: ['/node_modules/', '/lib-commonjs/', '\\.js$'],

        reporters: [path.resolve(__dirname, './jest-reporter.js')],

        testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

        setupFiles: [path.resolve(__dirname, 'jest-setup.js')],

        moduleDirectories: [
          'node_modules',
          path.resolve(packageRoot, 'node_modules'),
          path.resolve(__dirname, '../node_modules'),
        ],

        globals: {
          'ts-jest': {
            tsConfig: path.resolve(packageRoot, 'tsconfig.json'),
            packageJson: path.resolve(packageRoot, 'package.json'),
            diagnostics: false,
          },
        },

        testURL: 'http://localhost',

        watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
      },
      customConfig,
    ),
};
