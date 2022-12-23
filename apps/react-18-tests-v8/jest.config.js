// @ts-check

const { resolveMergeStylesSerializer } = require('@fluentui/scripts/jest/jest-resources');
const { getResolveAlias } = require('@fluentui/scripts/webpack');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'react-18-tests-v8',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      diagnostics: { warnOnly: true, exclude: ['packages/**'] },
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  moduleNameMapper: {
    '\\.(scss)$': '@fluentui/scripts/jest/jest-style-mock.js',
    ...getResolveAlias(),
  },
  snapshotSerializers: [resolveMergeStylesSerializer()],
};
