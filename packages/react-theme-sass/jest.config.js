// @ts-check

/**
 * @type {jest.InitialOptions}
 */
module.exports = {
  displayName: 'react-theme-sass',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      diagnostics: false,
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['scss', 'ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
};
