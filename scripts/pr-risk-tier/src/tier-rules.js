// @ts-check

/**
 * Rules that decide the risk tier of a pull request.
 *
 * The tier comes from changed file paths and changed line counts only. Nothing else about a pull request
 * (title, description, author, labels, draft state) may influence it. Anything not covered by a rule is tier 2.
 * Changing this file is itself a tier 3 change, because it lives under `scripts/`.
 *
 * @type {import('./types').TierRules}
 */
const tierRules = {
  version: '2026-11-10.2',
  maxSmallFixLines: 50,
  maxListedFiles: 3000,
  changeFiles: ['change/*.json'],
  tier3: [
    // Public API reports and package manifests.
    '**/*.api.md',
    '**/package.json',
    // Release, build and CI tooling.
    'yarn.lock',
    '.yarn/**',
    'nx.json',
    'beachball.config.js',
    'azure-pipelines*.yml',
    '*.config.{js,cjs,mjs,ts}',
    'tsconfig*.json',
    '.github/**',
    '.devops/**',
    'scripts/**',
    'tools/**',
    // Packages everything else depends on.
    'packages/tokens/**',
    'packages/react-components/react-theme/**',
    'packages/react-components/react-utilities/**',
    'packages/react-components/react-shared-contexts/**',
    // Agent instruction files steer automated reviewers, so they are never low risk.
    '**/CLAUDE.md',
    '**/AGENTS.md',
    '**/SKILL.md',
    '.agents/**',
    '.claude/**',
  ],
  tier0: {
    allow: ['packages/**/stories/**', 'packages/**/README.md', 'packages/**/library/docs/**'],
    // Storybook configuration and project manifests are not stories or documentation.
    exclude: ['**/.storybook/**', '**/tsconfig*.json', '**/project.json', '**/package.json'],
  },
  tests: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/__snapshots__/**', '**/*.snap'],
  // Most packages keep source in library/src; web-components keeps it in src.
  librarySource: ['**/library/src/**', 'packages/web-components/src/**'],
  packageRoots: [/^packages\/(?:react-components|charts)\/[^/]+\//, /^packages\/[^/]+\//],
};

module.exports = tierRules;
