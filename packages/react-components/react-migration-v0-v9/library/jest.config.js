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
  displayName: 'react-migration-v0-v9',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  // Keeps Jest from using too much memory as GC gets invokes more often, makes tests slower
  // https://stackoverflow.com/a/75857711
  workerIdleMemoryLimit: '1024MB',
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  /**
   * Griffel → Tailwind + CSS Modules migration (Phase 2, specials batch S3).
   * The mapper resolves `*.module.css` imports to a deterministic class-name proxy and
   * `cssModules.snapshotSerializer` strips those generated `fuicm-*` names from snapshots,
   * exactly as `@griffel/jest-serializer` does for Griffel atomics. Both are declared here
   * rather than inherited because a project-level `snapshotSerializers` REPLACES the
   * preset's array (documented in jest.preset.js).
   *
   * `@griffel/jest-serializer` STAYS. Nothing in this package's `library/src` imports
   * Griffel any more, but the components it renders do: `AttachmentAction` renders a v9
   * `<Button>`, and `@fluentui/react-icons` glyphs inside it carry Griffel atomics
   * (DECISIONS.md D11 keeps react-icons on Griffel). The `*.mixins.ts` files also return
   * `GriffelStyle` objects to consumers by design and are asserted in their own tests.
   */
  moduleNameMapper: {
    '\\.module\\.css$': cssModules.moduleNameMapperTarget,
  },
  snapshotSerializers: ['@griffel/jest-serializer', cssModules.snapshotSerializer],
};
