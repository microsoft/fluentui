// @ts-check

const fs = require('fs-extra');
const path = require('path');
const merge = require('../tasks/merge');
const resolve = require('resolve');
const { resolveCwd } = require('just-scripts');
const { findRepoDeps } = require('../monorepo/index');
const findConfig = require('../find-config');

const packageJsonPath = findConfig('package.json');
const packageRoot = path.dirname(packageJsonPath);

const jestAliases = () => {
  // Get deps of the current package within the repo
  const packageDeps = findRepoDeps();

  const aliases = {};

  for (const { packageJson } of packageDeps) {
    const { name, main } = packageJson;
    if (main && main.includes('lib-commonjs')) {
      // Map package root and lib imports to the commonjs version
      const mainImportPath = `${name}/${main.replace('.js', '')}`;
      aliases[`^${name}$`] = mainImportPath;
      aliases[`^${name}/lib/(.*)$`] = mainImportPath.replace('index', '$1');
    }
  }

  // Special aliases to look at src for the current package
  const packageJson = fs.readJSONSync(packageJsonPath);
  aliases[`^${packageJson.name}$`] = '<rootDir>/src/';
  aliases[`^${packageJson.name}/lib/(.*)$`] = '<rootDir>/src/$1';

  return aliases;
};

module.exports = {
  resolveMergeStylesSerializer: () => resolveCwd('@fluentui/jest-serializer-merge-styles'),
  createRawConfig: () => ({
    rootDir: 'lib',
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.js$',
  }),
  jestAliases,
  /**
   * @param {Partial<import('@jest/types').Config.InitialOptions>} [customConfig]
   */
  createConfig: (customConfig = {}) => {
    /** @type {import('@jest/types').Config.InitialOptions} */
    const defaultConfig = {
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
          diagnostics: false,
        },
      },

      testURL: 'http://localhost',

      watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    };

    return merge(defaultConfig, customConfig);
  },
};
