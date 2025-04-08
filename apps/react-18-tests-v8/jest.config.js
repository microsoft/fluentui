// @ts-check
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

// use default jest config to properly resolve react-18
delete config.moduleDirectories;

module.exports = config;
