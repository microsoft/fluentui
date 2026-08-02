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
  displayName: 'react-tag-picker',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
   * The mapper resolves `*.module.css` imports to a deterministic class-name proxy and
   * `cssModules.snapshotSerializer` strips those generated names from snapshots, exactly
   * as Griffel's jest serializer did for Griffel atomics. Both move into the repo-wide
   * `jest.preset.js` once more packages convert (DECISIONS.md D9).
   *
   * Griffel's jest serializer stays alongside it. No react-tag-picker source imports Griffel
   * any more, but this package renders `@fluentui/react-icons`' `ChevronDownRegular` as the
   * default `expandIcon`, and that package is an external Griffel consumer explicitly out of
   * scope for this migration (DECISIONS.md D11). Without it the glyph `<svg>` renders its
   * atomic + sequence-hash classes into every snapshot. It is also what the react-tags ledger
   * note flagged: this package's snapshots contain react-tags' and react-combobox's output too.
   */
  moduleNameMapper: {
    '\\.module\\.css$': cssModules.moduleNameMapperTarget,
  },
  snapshotSerializers: [cssModules.snapshotSerializer],
};
