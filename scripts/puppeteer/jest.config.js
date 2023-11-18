// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'scripts-puppeteer',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    '^puppeteer-core/internal/(.*)': '<rootDir>/../../node_modules/puppeteer-core/lib/cjs/puppeteer/$1',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
