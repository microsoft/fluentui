// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
export default {
  displayName: 'tools',
  preset: '../jest.preset.js',
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: false,
        isolatedModules: true,
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  coverageDirectory: './coverage',
};
