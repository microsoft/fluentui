// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'scripts-fluentui-publish',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', {}],
  },
  coverageDirectory: './coverage',
  testTimeout: 20000,
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest-setup.js'],
};
