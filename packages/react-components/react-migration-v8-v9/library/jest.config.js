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
  displayName: 'react-migration-v8-v9',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  // Keeps Jest from using too much memory as GC gets invokes more often, makes tests slower
  // https://stackoverflow.com/a/75857711
  workerIdleMemoryLimit: '1024MB',
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration (Phase 2, BATCH S4).
   * The mapper resolves `*.module.css` imports to a deterministic class-name proxy and
   * `cssModules.snapshotSerializer` strips those generated names from snapshots, exactly
   * as `@griffel/jest-serializer` does for Griffel atomics. Both move into the repo-wide
   * `jest.preset.js` once more packages convert (DECISIONS.md D9).
   *
   * `@griffel/jest-serializer` STAYS: no source in this package imports Griffel any more, but
   * these are v8/v9 interop shims — CheckboxShim renders `@fluentui/react-checkbox`, whose
   * indicator renders `@fluentui/react-icons` glyphs, and that package is an external Griffel
   * consumer explicitly out of scope for this migration (DECISIONS.md D11). The v8
   * `@fluentui/react` half emits merge-styles `css-NN` classes, which neither serializer
   * touches and which are part of what these shims are asserting.
   */
  moduleNameMapper: {
    '\\.module\\.css$': cssModules.moduleNameMapperTarget,
  },
  snapshotSerializers: ['@griffel/jest-serializer', cssModules.snapshotSerializer],
};
