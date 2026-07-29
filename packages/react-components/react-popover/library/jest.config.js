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
  displayName: 'react-popover',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration (DECISIONS.md D9).
   * The mapper resolves `*.module.css` imports to a deterministic class-name proxy and the
   * serializer strips those generated names from snapshots, exactly as
   * `@griffel/jest-serializer` did for Griffel atomics. The mapper is also in the repo-wide
   * `jest.preset.js`, but a project-level `snapshotSerializers` REPLACES the preset's array,
   * so it has to be listed here.
   *
   * `@griffel/jest-serializer` is dropped rather than kept alongside (the react-tooltip
   * precedent): no file under `src/` imports `@griffel/react` any more, this package renders
   * no `@fluentui/react-icons` glyphs, and nothing its three components mount — Portal,
   * MotionRefForwarder, the tabster/aria attribute hooks — emits Griffel atomics into the
   * DOM. Verified against the two committed snapshots, neither of which contained one.
   */
  moduleNameMapper: {
    '\\.module\\.css$': cssModules.moduleNameMapperTarget,
  },
  snapshotSerializers: [cssModules.snapshotSerializer],
};
