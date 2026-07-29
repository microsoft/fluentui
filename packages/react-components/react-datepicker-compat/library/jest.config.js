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
  displayName: 'react-datepicker-compat',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration.
   * The mapper resolves `*.module.css` imports to a deterministic class-name proxy and
   * `cssModules.snapshotSerializer` strips those generated names from snapshots, exactly
   * as `@griffel/jest-serializer` does for Griffel atomics. Both move into the repo-wide
   * `jest.preset.js` once more packages convert (DECISIONS.md D9). The mapper is already
   * in the preset and merges; a project-level `snapshotSerializers` array REPLACES the
   * preset's, which is why this file has to list the serializer itself.
   *
   * `@griffel/jest-serializer` STAYS: no react-datepicker-compat source imports Griffel any
   * more, but DatePicker renders a `@fluentui/react-icons` glyph (`CalendarMonthRegular`)
   * and mounts a `<Calendar>` from the still-Griffel `@fluentui/react-calendar-compat`.
   * Without it, both would spray atomic + sequence-hash classes into every snapshot.
   */
  moduleNameMapper: {
    '\\.module\\.css$': cssModules.moduleNameMapperTarget,
  },
  snapshotSerializers: ['@griffel/jest-serializer', cssModules.snapshotSerializer],
};
