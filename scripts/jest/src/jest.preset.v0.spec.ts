import { workspaceRoot } from '@nx/devkit';

import preset from './jest.preset.v0';

describe(`v0 preset`, () => {
  it(`should create v0 preset`, () => {
    const actual = preset({});

    expect(actual).toEqual(
      expect.objectContaining({
        coverageDirectory: './coverage/',
        coverageReporters: ['json', 'lcov'],
        moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
        moduleNameMapper: expect.any(Object),
        modulePathIgnorePatterns: expect.any(Array),
        setupFilesAfterEnv: [`${workspaceRoot}/scripts/jest/src/v0/setupTests.js`],
        testRegex: '/test/.*-test\\.tsx?$',
        transform: {
          '^.+\\.tsx?$': 'babel-jest',
        },
        testEnvironment: 'jsdom',
        verbose: false,
        watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
      }),
    );

    const keys = Object.keys(actual.moduleNameMapper);
    const values = Object.values(actual.moduleNameMapper);

    expect(keys).toContainEqual(expect.stringMatching(/^\^@fluentui\/[a-z-/0-9]+/));
    expect(values).toContainEqual(expect.stringMatching(/[a-z/-]+\/src\/index$/i));
  });
});
