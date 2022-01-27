import { BeachballConfig } from 'beachball';
import { renderHeader, renderEntry } from './customRenderers';
import { getScopes } from './getScopes';
import { getVNextChangelogGroups } from './getVNextChangelogGroups';

export const config: BeachballConfig = {
  disallowedChangeTypes: ['major', 'prerelease'],
  tag: 'latest',
  generateChangelog: true,
  ignorePatterns: [
    '**/*.{shot,snap}',
    '**/*.{test,spec}.{ts,tsx}',
    '**/*.stories.tsx',
    '**/.eslintrc.*',
    '**/__fixtures__/**',
    '**/__mocks__/**',
    '**/common/isConformant.ts',
    '**/jest.config.js',
    '**/SPEC*.md',
    '**/tests/**',
  ],
  scope: getScopes(),
  changelog: {
    customRenderers: {
      renderHeader,
      renderEntry,
    },
    groups: [getVNextChangelogGroups()],
  },
};
