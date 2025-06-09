// @ts-check
/* eslint-disable */

const { readFileSync } = require('node:fs');
const { join } = require('node:path');

// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const { exclude: _, ...swcJestConfig } = JSON.parse(readFileSync(join(__dirname, '.swcrc'), 'utf-8'));

// disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves.
// If we do not disable this, SWC Core will read .swcrc and won't transform our test files due to "exclude"
if (swcJestConfig.swcrc === undefined) {
  swcJestConfig.swcrc = false;
}

// Uncomment if using global setup/teardown files being transformed via swc
// https://nx.dev/packages/jest/documents/overview#global-setup/teardown-with-nx-libraries
// jest needs EsModule Interop to find the default exported setup/teardown functions
// swcJestConfig.module.noInterop = false;

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'react-18-tests-v9',
  preset: '../../jest.preset.js',
  // Heads up!
  // Forces React to be resolved from the root node_modules to ensure the same instance is used across all packages
  moduleNameMapper: {
    '^react$': join(__dirname, '/node_modules/react'),
    '^react-dom$': join(__dirname, 'node_modules/react-dom'),
    '^react-dom/(test-utils|client)$': join(__dirname, 'node_modules/react-dom/$1'),
    '^react-test-renderer$': join(__dirname, 'node_modules/react-test-renderer'),
    '^@testing-library/(react|dom)$': join(__dirname, 'node_modules/@testing-library/$1'),
  },
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  snapshotSerializers: ['@griffel/jest-serializer'],
};
