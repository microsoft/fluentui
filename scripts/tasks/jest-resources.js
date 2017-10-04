const path = require('path');
const merge = require('./merge');

const styleMockPath =
  module.exports = {
    createRawConfig: () => (
      {
        rootDir: 'lib',
        'testRegex': '(/__tests__/.*|\\.(test|spec))\\.js$',
      }
    ),
    createConfig: (customConfig) => merge(
      {
        moduleNameMapper: {
          'ts-jest': path.resolve(__dirname, '../node_modules/ts-jest'),
          '\\.(scss)$': path.resolve(__dirname, 'jest-style-mock.js'),
          'KeyCodes': path.resolve(__dirname, 'jest-mock.js')
        },

        'transform': {
          '.(ts|tsx)': path.resolve(__dirname, '../node_modules/ts-jest/preprocessor.js')
        },

        'reporters': [
          path.resolve(__dirname, './jest-reporter.js')
        ],

        'testRegex': '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
        'moduleFileExtensions': [
          'ts',
          'tsx',
          'js',
          'jsx',
          'json'
        ],

        'setupFiles': [
          path.resolve(__dirname, './jest-disable-warnings.js')
        ],

        'moduleDirectories': [
          'node_modules',
          path.resolve(process.cwd(), 'node_modules'),
          path.resolve(__dirname, '../node_modules')
        ],

        'snapshotSerializers': [
          path.resolve(__dirname, 'jest-serializer-merge-styles')
        ]

      }, customConfig)
  };
