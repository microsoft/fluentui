// @ts-check

/**
 * @type {jest.InitialOptions}
 */
module.exports = {
  displayName: 'tools',
  preset: '../jest.preset.js',
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
};
