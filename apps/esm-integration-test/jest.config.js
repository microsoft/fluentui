// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'esm-integration-app',
  preset: '../../jest.preset.js',
  // turn off TS path aliases in order to test consuming ESM packages by users
  moduleNameMapper: null,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        isolatedModules: true,
        diagnostics: false, // Turn off ts-jest warnings
      },
    ],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
};
