// @ts-check
const { join } = require('node:path');
const { createV8Config: createConfig } = require('@fluentui/scripts-jest');

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
  '^react$': join(__dirname, '/node_modules/react'),
  '^react-dom$': join(__dirname, 'node_modules/react-dom'),
  '^react-dom/test-utils$': join(__dirname, 'node_modules/react-dom/test-utils'),
  '^react-test-renderer$': join(__dirname, 'node_modules/react-test-renderer'),
  '^react-is$': join(__dirname, 'node_modules/react-is'),
  '^@testing-library/(react|dom)$': join(__dirname, 'node_modules/@testing-library/$1'),
};

// use default jest config to properly resolve react-18
delete config.moduleDirectories;

module.exports = config;
