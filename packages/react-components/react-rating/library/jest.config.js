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
  displayName: 'react-rating',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
   * The `*.module.css` moduleNameMapper is repo-wide in `jest.preset.js`, but a
   * project-level `snapshotSerializers` REPLACES the preset's array rather than merging
   * it, so a converted package that declares its own has to list
   * `cssModules.snapshotSerializer` itself (DECISIONS.md D9).
   *
   * Griffel's jest serializer was kept alongside it (retired in the S-J closing batch — icons 3.0 emits no Griffel classes): RatingItem renders the caller's
   * `iconFilled` / `iconOutline` elements, which are `@fluentui/react-icons` <svg>s and
   * still emit Griffel atomics into the same `class=` attribute.
   */
  snapshotSerializers: [cssModules.snapshotSerializer],
};
