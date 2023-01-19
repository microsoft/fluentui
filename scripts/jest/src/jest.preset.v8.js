const fs = require('fs-extra');
const path = require('path');

const { findRepoDeps } = require('@fluentui/scripts-monorepo');
const { findConfig, merge } = require('@fluentui/scripts-utils');

const packageJsonPath = findConfig('package.json') ?? '';
const packageRoot = path.dirname(packageJsonPath);

const jestAliases = () => {
  // Get deps of the current package within the repo
  const packageDeps = findRepoDeps();

  /** @type {Record<string,string>} */
  const aliases = {};

  // eslint-disable-next-line no-shadow
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

/**
 * @param {Partial<import('@jest/types').Config.InitialOptions>} [customConfig]
 */
const createConfig = (customConfig = {}) => {
  /** @type {import('@jest/types').Config.InitialOptions} */
  const defaultConfig = {
    moduleNameMapper: {
      '\\.(scss)$': path.resolve(__dirname, './v8/jest-style-mock.js'),
      KeyCodes: path.resolve(__dirname, './v8/jest-mock.js'),
      ...jestAliases(),
    },

    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },

    transformIgnorePatterns: ['/node_modules/', '/lib-commonjs/', '\\.js$'],

    reporters: [path.resolve(__dirname, './v8/jest-reporter.js')],

    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

    setupFiles: [path.resolve(__dirname, './v8/jest-setup.js')],

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
};

module.exports = createConfig;
