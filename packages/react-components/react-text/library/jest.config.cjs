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
  displayName: 'react-text',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.cjs'],
  /**
   * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
   * The mapper resolves `*.module.css` imports to a deterministic class-name proxy and
   * the serializer strips those generated names from snapshots, exactly as
   * Griffel's jest serializer did for Griffel atomics (DECISIONS.md D9).
   *
   * Griffel's jest serializer is DROPPED rather than kept alongside: every component in
   * this package is converted and none of them renders an `@fluentui/react-icons` glyph
   * (that package is external Griffel and out of scope per D11 — the reason react-badge
   * had to keep both). Nothing in a react-text snapshot can carry a Griffel atomic.
   */
  moduleNameMapper: {
    '\\.module\\.css$': cssModules.moduleNameMapperTarget,
  },
  snapshotSerializers: [cssModules.snapshotSerializer],
};
