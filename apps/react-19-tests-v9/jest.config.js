// @ts-check

const { join } = require('node:path');

const { getNodeModulesPath } = require('./config/utils');

const usedNodeModulesPath = getNodeModulesPath();

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'react-19-tests-v9',
  preset: '../../jest.preset.js',
  // Heads up!
  // Forces React to be resolved from the root node_modules to ensure the same instance is used across all packages
  moduleNameMapper: {
    '^react$': join(usedNodeModulesPath, './react'),
    '^react-dom$': join(usedNodeModulesPath, './react-dom'),
    '^react-dom/(test-utils|client)$': join(usedNodeModulesPath, './react-dom/$1'),
    '^react-test-renderer$': join(usedNodeModulesPath, './react-test-renderer'),
    '^@testing-library/(react|dom)$': join(usedNodeModulesPath, './@testing-library/$1'),
  },
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', {}],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
};
