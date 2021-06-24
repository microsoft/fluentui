// @ts-check

/**
 * @type {jest.InitialOptions}
 */
module.exports = {
  displayName: 'bundle-size',
  preset: '../../jest.preset.js',
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./config/tests.js'],
};
