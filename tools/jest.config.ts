// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
export default {
  displayName: 'tools',
  preset: '../jest.preset.js',
  globals: {},
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: false,
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  coverageDirectory: './coverage',
};
