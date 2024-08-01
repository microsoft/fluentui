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
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest-setup.js'],
};
