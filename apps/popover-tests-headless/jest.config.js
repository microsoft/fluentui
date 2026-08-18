// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'popover-tests-headless',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', {}],
  },
  testEnvironment: 'jsdom',
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
};
