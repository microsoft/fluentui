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
  /**
   * @param {*} customConfig Custom jest config
   * @param {boolean} [useMonaco] If true, include options that make monaco-editor work in tests
   */
  createConfig: (customConfig, useMonaco) =>
    merge(
      {
        moduleNameMapper: {
          'ts-jest': resolve.sync('ts-jest'),
          '\\.(css|scss)$': path.resolve(__dirname, 'jest-style-mock.js'),
          KeyCodes: path.resolve(__dirname, 'jest-mock.js')
        },

        transform: {
          '\\.(ts|tsx)': resolve.sync('ts-jest/dist'),
          ...(useMonaco
            ? {
                'monaco-editor': path.join(__dirname, 'monaco-transform.js')
              }
            : {})
        },

        transformIgnorePatterns: useMonaco
          ? [
              '/lib-commonjs/',
              // Ignore all node_modules except ones with monaco-editor in the path (using negative lookahead)
              '/node_modules/(?!monaco-editor)',
              // Ignore all JS files except ones with monaco-editor in the path (using negative lookbehind)
              '(?<!monaco-editor/.*)\\.js$'
            ]
          : ['/lib-commonjs/', '/node_modules/', '\\.js$'],

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
