// @ts-check

const { join } = require('node:path');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'react-19-tests-v9',
  preset: '../../jest.preset.js',
  // Heads up!
  // Forces React to be resolved from the root node_modules to ensure the same instance is used across all packages
  moduleNameMapper: {
    '^react$': join(__dirname, '/node_modules/react'),
    '^react-dom$': join(__dirname, 'node_modules/react-dom'),
    '^react-dom/test-utils$': join(__dirname, 'node_modules/react-dom/test-utils'),
    '^react-test-renderer$': join(__dirname, 'node_modules/react-test-renderer'),
    '^@testing-library/(react|dom)$': join(__dirname, 'node_modules/@testing-library/$1'),
  },
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', {}],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
};
