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
  displayName: 'react-field',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration.
   * `jest.preset.js` already maps `*.module.css` repo-wide, but a project-level
   * `snapshotSerializers` REPLACES the preset's array rather than merging with it — so a
   * package that declares its own has to list `cssModules.snapshotSerializer` itself
   * (DECISIONS.md D9). The mapper is repeated here for symmetry with the other converted
   * packages; `moduleNameMapper` merges, so the duplicate is a no-op.
   *
   * Like react-persona and unlike react-divider, this package keeps
   * `@griffel/jest-serializer` as well: no react-field source imports Griffel any more,
   * but Field renders `@fluentui/react-icons` glyphs inside its validationMessageIcon
   * slot, and that package is an external Griffel consumer explicitly out of scope for
   * this migration (DECISIONS.md D11). Without it the icon `<svg>` renders its atomic +
   * sequence-hash classes into every snapshot.
   */
  moduleNameMapper: {
    '\\.module\\.css$': cssModules.moduleNameMapperTarget,
  },
  snapshotSerializers: ['@griffel/jest-serializer', cssModules.snapshotSerializer],
};
