const path = require('path');

const styleMockPath =
  module.exports = {
    createRawConfig: () => (
      {
        rootDir: 'lib',
        'testRegex': '(/__tests__/.*|\\.(test|spec))\\.js$',
      }
    ),
    createConfig: () => (
      {
        moduleNameMapper: {
          'ts-jest': path.resolve(__dirname, '../node_modules/ts-jest'),
          '\\.(scss)$': path.resolve(__dirname, 'jest-style-mock.js')
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

        'moduleDirectories': [
          'node_modules',
          path.resolve(process.cwd(), 'node_modules'),
          path.resolve(__dirname, '../node_modules')
        ],

        'snapshotSerializers': [
          path.resolve(__dirname, 'jest-serializer-merge-styles')
        ]

      })
  };
