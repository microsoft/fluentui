// @ts-check

/**
 * @type {jest.InitialOptions}
 */
module.exports = {
  displayName: 'babel-make-styles',
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
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['./config/tests.js'],
};
