import type { BeachballConfig } from 'beachball';
import * as fs from 'fs';
import * as path from 'path';

import { renderHeader, renderEntry } from './customRenderers';

const baseConfig: BeachballConfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'base.config.json'), { encoding: 'utf8' }),
);

export const config: BeachballConfig = {
  ...baseConfig,
  changelog: {
    customRenderers: {
      renderHeader,
      renderEntry,
    },
  },
};
