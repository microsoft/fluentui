// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'scripts-perf-test-flamegrill',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
