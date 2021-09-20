import { BeachballConfig } from 'beachball';
import { renderHeader, renderEntry } from './customRenderers';
import { getScopes } from './getScopes';
import { getVNextChangelogGroups } from './getVNextChangelogGroups';

export const config: BeachballConfig = {
  disallowedChangeTypes: ['major', 'prerelease'],
  tag: 'latest',
  generateChangelog: true,
  // https://github.com/microsoft/beachball/pull/599
  // @ts-ignore
  scope: getScopes(),
  changelog: {
    customRenderers: {
      renderHeader,
      renderEntry,
    },
    groups: [getVNextChangelogGroups()],
  },
};
