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
  displayName: 'react-tree',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration (Phase 2, BATCH-3).
   *
   * The repo-wide `jest.preset.js` already maps `*.module.css` to the class-name proxy
   * (jest MERGES `moduleNameMapper` from a preset), but a project-level
   * `snapshotSerializers` REPLACES the preset's array — so `cssModules.snapshotSerializer`
   * has to be listed here explicitly or the generated `fuicm-…` names leak into snapshots.
   *
   * `@griffel/jest-serializer` is kept alongside it: react-tree renders
   * `@fluentui/react-checkbox` / `@fluentui/react-radio` (the `selector` slot),
   * `@fluentui/react-avatar` (TreeItemPersonaLayout's `media`) and
   * `@fluentui/react-button` (the actions surface), several of which still author their
   * styles with Griffel and emit atomics into the same `class=` attribute.
   */
  snapshotSerializers: ['@griffel/jest-serializer', cssModules.snapshotSerializer],
};
