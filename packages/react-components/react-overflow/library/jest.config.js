// @ts-check
/* eslint-disable */

const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const { cssModules } = require('@fluentui/scripts-jest');

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
  displayName: 'react-overflow',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration (Phase 2, BATCH-4).
   * `moduleNameMapper` for `*.module.css` already comes from the repo-wide `jest.preset.js`
   * (jest MERGES that key from a preset), but `snapshotSerializers` REPLACES the preset's
   * array — so a package that declares its own has to list `cssModules.snapshotSerializer`
   * itself or every generated class name leaks into its snapshots (DECISIONS.md D9).
   *
   * Griffel's jest serializer stays alongside it even though react-overflow now imports no
   * `@griffel/*` module of its own: `Overflow` clones whatever child a test renders, so a
   * suite that wraps a still-Griffel component emits atomics into the same `class=`
   * attribute this package writes to.
   */
  snapshotSerializers: [cssModules.snapshotSerializer],
};
