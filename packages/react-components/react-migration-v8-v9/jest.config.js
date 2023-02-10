// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'react-migration-v8-v9',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      diagnostics: false,
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  snapshotSerializers: ['@griffel/jest-serializer'],
};
