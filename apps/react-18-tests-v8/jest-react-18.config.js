// @ts-check
const jestConfig = require('./jest.config');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  ...jestConfig,
  displayName: 'react-18-tests-v8-integration',
  roots: ['<rootDir>/../../packages/react/src', '<rootDir>/../../packages/react-hooks/src'],
};

module.exports = config;
