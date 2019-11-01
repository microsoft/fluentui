const path = require('path');
const merge = require('../tasks/merge');
const resolve = require('resolve');
const { resolveCwd } = require('just-scripts');

module.exports = {
  resolveMergeStylesSerializer: () => resolveCwd('@uifabric/jest-serializer-merge-styles'),
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
          '.(ts|tsx)': resolve.sync('ts-jest/dist')
        },

        transformIgnorePatterns: ['/node_modules/', '/lib-commonjs/', '\\.js$'],

        reporters: [path.resolve(__dirname, './jest-reporter.js')],

        testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

        setupFiles: [path.resolve(__dirname, 'jest-setup.js')],

        moduleDirectories: ['node_modules', path.resolve(process.cwd(), 'node_modules'), path.resolve(__dirname, '../node_modules')],

        globals: {
          'ts-jest': {
            tsConfig: path.resolve(process.cwd(), 'tsconfig.json'),
            packageJson: path.resolve(process.cwd(), 'package.json'),
            diagnostics: false
          }
        },

        testURL: 'http://localhost'
      },
      customConfig
    )
};
