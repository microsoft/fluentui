/** @satisfies {import('beachball').BeachballConfig} */
const config = {
  access: 'public',
  // Target branch WITHOUT remote, since people may have multiple remotes and choose different naming schemes.
  // Specifying this helps beachball more quickly determine the target branch + remote at runtime.
  branch: 'master',
  commit: false,
  disallowedChangeTypes: ['major'],
  tag: 'latest',
  generateChangelog: true,
  ignorePatterns: [
    '**/*.{shot,snap}',
    '**/*.{test,spec,cy}.{ts,tsx}',
    '**/*.stories.{ts,tsx}',
    '**/.eslintrc.*',
    '**/eslint.config.*',
    '**/rit.config.js',
    '**/__fixtures__/**',
    '**/__mocks__/**',
    '**/docs/**',
    '**/stories/**',
    '**/.storybook/**',
    '**/bundle-size/**',
    '**/monosize.config.mjs',
    '**/common/isConformant.ts',
    '**/src/testing/**',
    '**/src/e2e/**',
    '**/config/tests.js',
    '**/jest.config.js',
    '**/SPEC*.md',
    '**/tests/**',
  ],
  scope: ['!packages/fluentui/*'],
  changehint: "Run 'yarn change' to generate a change file",
};

module.exports = config;
