// @ts-check
/* eslint-disable */

const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const { getNodeModulesPath } = require('./config/utils');

const { usedNodeModulesPath, workspaceRootNodeModulesPath } = getNodeModulesPath();

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
  displayName: 'react-17-tests-v9',
  preset: '../../jest.preset.js',
  // Heads up!
  // Forces React to be resolved from the root node_modules to ensure the same instance is used across all packages
  moduleNameMapper: {
    '^react$': join(usedNodeModulesPath, './react'),
    '^react-dom$': join(usedNodeModulesPath, './react-dom'),
    '^react-dom/(server|test-utils)$': join(usedNodeModulesPath, './react-dom/$1'),
    // React 17 doesn't have this API so we need to explicitly point it to noop module
    // NOTE: noop.js doesn't exist
    '^react-dom/client$': join(usedNodeModulesPath, 'noop.js'),
    '^react-test-renderer$': join(usedNodeModulesPath, './react-test-renderer'),
    '^@testing-library/(react|dom)$': join(usedNodeModulesPath, './@testing-library/$1'),
    // need to remap to monorepo root as react-hooks is hoisted
    '^@testing-library/react-hooks$': join(workspaceRootNodeModulesPath, './@testing-library/react-hooks'),
  },
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  snapshotSerializers: ['@griffel/jest-serializer'],
};
