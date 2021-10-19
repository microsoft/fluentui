// @ts-check

/**
 * @type {jest.InitialOptions}
 */
module.exports = {
  displayName: 'react-checkbox',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
      diagnostics: false,
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  snapshotSerializers: ['@fluentui/jest-serializer-make-styles'],
};
