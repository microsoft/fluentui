// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'scripts-monorepo',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', {}],
  },
  coverageDirectory: './coverage',
  testTimeout: 60000,
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest-setup.js'],
};
