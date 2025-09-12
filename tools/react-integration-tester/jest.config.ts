/* eslint-disable */
import { readFileSync } from 'fs';

// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const { exclude: _, ...swcJestConfig } = JSON.parse(readFileSync(`${__dirname}/.swcrc`, 'utf-8'));

// disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves.
// If we do not disable this, SWC Core will read .swcrc and won't transform our test files due to "exclude"
if (swcJestConfig.swcrc === undefined) {
  swcJestConfig.swcrc = false;
}

// Uncomment if using global setup/teardown files being transformed via swc
// https://nx.dev/nx-api/jest/documents/overview#global-setupteardown-with-nx-libraries
// jest needs EsModule Interop to find the default exported setup/teardown functions
// swcJestConfig.module.noInterop = false;

export default {
  displayName: 'react-integration-tester',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  testEnvironment: 'node',
  coverageDirectory: '../../coverage/tools/react-integration-tester',
};
