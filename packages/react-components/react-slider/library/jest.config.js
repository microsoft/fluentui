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
  displayName: 'react-slider',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration (specials batch S1).
   * The mapper resolves `*.module.css` imports to a deterministic class-name proxy and
   * `cssModules.snapshotSerializer` strips those generated names from snapshots, exactly
   * as Griffel's jest serializer did for Griffel atomics.
   *
   * Griffel's jest serializer is DROPPED: nothing this suite renders authors Griffel any
   * more. Slider's own styles are converted, `@fluentui/react-field` (the only styled
   * component the suite mounts, in the surrounding-Field test) is converted, and
   * `@fluentui/react-tabster` contributes only the `useFocusWithin` ref — no classes.
   *
   * Note Jest MERGES `moduleNameMapper` from the preset but a project-level
   * `snapshotSerializers` REPLACES the preset's array, which is why this file has to list
   * the serializer itself.
   */
  moduleNameMapper: {
    '\\.module\\.css$': cssModules.moduleNameMapperTarget,
  },
  snapshotSerializers: [cssModules.snapshotSerializer],
};
