// @ts-check

/**
 * @type {jest.InitialOptions}
 */
module.exports = {
  displayName: 'make-styles-webpack-loader',
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
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
};
