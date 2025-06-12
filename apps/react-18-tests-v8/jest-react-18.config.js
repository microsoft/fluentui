// @ts-check
const jestConfig = require('./jest.config');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  ...jestConfig,
  displayName: 'react-18-tests-v8-integration',
  roots: ['<rootDir>/../../packages/react/src', '<rootDir>/../../packages/react-hooks/src'],
  // Keeps Jest from using too much memory as GC gets invokes more often, makes tests slower
  // https://stackoverflow.com/a/75857711
  workerIdleMemoryLimit: '1024MB',
};

module.exports = config;
