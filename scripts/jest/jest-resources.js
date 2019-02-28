const path = require('path');
const merge = require('../tasks/merge');
const resolve = require('resolve');

module.exports = {
  createRawConfig: () => ({
    rootDir: 'lib',
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.js$'
  }),
  createConfig: customConfig =>
    merge(
      {
        moduleNameMapper: {
          'ts-jest': resolve.sync('ts-jest'),
          '\\.(scss)$': path.resolve(__dirname, 'jest-style-mock.js'),
          KeyCodes: path.resolve(__dirname, 'jest-mock.js')
        },

        transform: {
          '.(ts|tsx)': resolve.sync('ts-jest/preprocessor.js')
        },

        reporters: [path.resolve(__dirname, './jest-reporter.js')],

        testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

        setupFiles: [path.resolve(__dirname, 'jest-setup.js')],

        moduleDirectories: ['node_modules', path.resolve(process.cwd(), 'node_modules'), path.resolve(__dirname, '../node_modules')],

        globals: {
          'ts-jest': {
            tsConfigFile: path.resolve(process.cwd(), 'tsconfig.json')
          }
        },

        testURL: 'http://localhost'
      },
      customConfig
    )
};
