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
  displayName: 'react-list',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration (Phase 2).
   * The mapper resolves `*.module.css` imports to a deterministic class-name proxy and
   * `cssModules.snapshotSerializer` strips those generated names from snapshots, exactly
   * as Griffel's jest serializer did for Griffel atomics. Both move into the repo-wide
   * `jest.preset.js` once more packages convert (DECISIONS.md D9).
   *
   * Like react-badge and unlike react-divider, this package keeps
   * Griffel's jest serializer as well: no react-list source imports Griffel any more, but
   * ListItem renders a `<Checkbox>` for its checkmark slot, and a CHECKED Checkbox renders
   * `@fluentui/react-icons` glyphs — an external Griffel consumer explicitly out of scope
   * for this migration (DECISIONS.md D11). Without it those `<svg>`s carry their atomic +
   * sequence-hash classes into every snapshot that renders a selected item.
   *
   * ORDER NOTE (cost the react-list conversion one snapshot churn): pretty-format uses the
   * FIRST plugin whose `test()` passes, so a single element carrying BOTH kinds of class
   * was serialized by Griffel's jest serializer alone (retired in the S-J closing batch) and kept its `fuicm-*` name — the
   * limitation documented in scripts/jest/src/css-modules/serializer.js. That happened
   * here while react-checkbox was mid-conversion, because ListItem's `fuicm-checkmark`
   * rode on the same `<span>` as Checkbox's Griffel atomics. With react-checkbox converted
   * no element mixes the two: the icon `<svg>`s carry Griffel classes only.
   */
  moduleNameMapper: {
    '\\.module\\.css$': cssModules.moduleNameMapperTarget,
  },
  snapshotSerializers: [cssModules.snapshotSerializer],
};
