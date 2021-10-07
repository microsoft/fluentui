// @ts-check

/**
 * @type {jest.InitialOptions}
 */
module.exports = {
  displayName: 'tools',
  preset: '../jest.preset.js',
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageDirectory: './coverage',
};
