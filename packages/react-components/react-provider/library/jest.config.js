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
  displayName: 'react-provider',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration.
   * The mapper resolves `*.module.css` imports to a deterministic class-name proxy and
   * the serializer strips those generated names from snapshots, exactly as
   * `@griffel/jest-serializer` did for Griffel atomics (DECISIONS.md D9).
   *
   * `@griffel/jest-serializer` was dropped in S-G: react-provider no longer imports
   * `@griffel/react` at all (`TextDirectionProvider` removed, `useRenderer_unstable`
   * replaced by the Fluent-owned nonce context — D20), and no test in this package
   * renders Griffel-styled descendants anymore.
   *
   * The css-modules serializer is registered repo-wide in `jest.preset.js`, because
   * FluentProvider is imported by test suites in ~every v9 package; this local copy is
   * required only because a project-level `snapshotSerializers` REPLACES (does not merge
   * with) the preset value in Jest's config normalisation.
   */
  moduleNameMapper: {
    '\\.module\\.css$': cssModules.moduleNameMapperTarget,
  },
  snapshotSerializers: [cssModules.snapshotSerializer],
};
