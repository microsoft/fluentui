// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'vr-tests-web-components',
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
};
