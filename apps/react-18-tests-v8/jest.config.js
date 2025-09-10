// @ts-check
const { join } = require('node:path');
const { createV8Config: createConfig } = require('@fluentui/scripts-jest');

const { getNodeModulesPath } = require('./config/utils');

const { usedNodeModulesPath } = getNodeModulesPath();

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = createConfig({
  displayName: 'react-18-tests-v8',
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  snapshotSerializers: ['@fluentui/jest-serializer-merge-styles'],
});

const moduleNameMapper = config.moduleNameMapper || {};

config.moduleNameMapper = {
  ...moduleNameMapper,
  '^react$': join(usedNodeModulesPath, './react'),
  '^react-dom$': join(usedNodeModulesPath, './react-dom'),
  '^react-dom/test-utils$': join(usedNodeModulesPath, './react-dom/test-utils'),
  '^react-test-renderer$': join(usedNodeModulesPath, './react-test-renderer'),
  '^react-is$': join(usedNodeModulesPath, './react-is'),
  '^@testing-library/(react|dom)$': join(usedNodeModulesPath, './@testing-library/$1'),
};

// use default jest config to properly resolve react-18
delete config.moduleDirectories;

module.exports = config;
