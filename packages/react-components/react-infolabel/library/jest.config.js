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
  displayName: 'react-infolabel',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration (Phase 2, batch 2).
   * The mapper resolves `*.module.css` imports to a deterministic class-name proxy and
   * `cssModules.snapshotSerializer` strips those generated names from snapshots, exactly
   * as Griffel's jest serializer did for Griffel atomics. Both move into the repo-wide
   * `jest.preset.js` once more packages convert (DECISIONS.md D9).
   *
   * Like react-badge and react-button — and unlike react-divider — this package KEEPS
   * Griffel's jest serializer, now for ONE reason: InfoButton renders
   * `@fluentui/react-icons` glyphs, an external Griffel consumer explicitly out of scope
   * (DECISIONS.md D11). Without it those atomic + sequence-hash classes land in every
   * snapshot. The second reason is gone — the `info` slot's Griffel `makeStyles` was
   * converted in Phase 3 once react-popover landed (see useInfoButtonStyles.styles.ts), and
   * this package no longer depends on `@griffel/react` at all.
   */
  moduleNameMapper: {
    '\\.module\\.css$': cssModules.moduleNameMapperTarget,
  },
  snapshotSerializers: [cssModules.snapshotSerializer],
};
