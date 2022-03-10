import type { BeachballConfig } from 'beachball';
import * as fs from 'fs';
import * as path from 'path';

import { renderHeader, renderEntry } from './customRenderers';
import { getScopes } from './getScopes';
import { getVNextChangelogGroups } from './getVNextChangelogGroups';

const baseConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.beachballrc.base.json'), { encoding: 'utf8' }));

export const config: BeachballConfig = {
  ...baseConfig,
  scope: getScopes(),
  changelog: {
    customRenderers: {
      renderHeader,
      renderEntry,
    },
    groups: [getVNextChangelogGroups()],
  },
};
