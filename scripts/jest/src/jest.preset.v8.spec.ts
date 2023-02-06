import { workspaceRoot } from '@nrwl/devkit';

import preset from './jest.preset.v8';

describe(`v8 preset`, () => {
  it(`should create v8 preset`, () => {
    const actual = preset();

    expect(actual).toEqual(
      expect.objectContaining({
        globals: {
          'ts-jest': {
            diagnostics: false,
          },
        },
        moduleDirectories: [
          'node_modules',
          `${workspaceRoot}/scripts/jest/node_modules`,
          `${workspaceRoot}/scripts/jest/node_modules`,
        ],
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
        moduleNameMapper: {
          KeyCodes: `${workspaceRoot}/scripts/jest/src/v8/jest-mock.js`,
          '\\.(scss)$': `${workspaceRoot}/scripts/jest/src/v8/jest-style-mock.js`,
          '^@fluentui/scripts-jest$': '<rootDir>/src/',
          '^@fluentui/scripts-jest/lib/(.*)$': '<rootDir>/src/$1',
        },
        reporters: [`${workspaceRoot}/scripts/jest/src/v8/jest-reporter.js`],
        setupFiles: [`${workspaceRoot}/scripts/jest/src/v8/jest-setup.js`],
        testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
        testURL: 'http://localhost',
        transform: {
          '^.+\\.tsx?$': 'ts-jest',
        },
        transformIgnorePatterns: ['/node_modules/', '/lib-commonjs/', '\\.js$'],
        watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
      }),
    );
  });
});
