// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'react-data-grid-react-window',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      isolatedModules: true,
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  snapshotSerializers: ['@griffel/jest-serializer'],
};
