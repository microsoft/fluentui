// @ts-check
const jestConfig = require('./jest.config');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  ...jestConfig,
  roots: ['<rootDir>/../../packages/react/src', '<rootDir>/../../packages/react-hooks/src'],
};

module.exports = config;
