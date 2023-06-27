// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'scripts-bundle-size-auditor',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
