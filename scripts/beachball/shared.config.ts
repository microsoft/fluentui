import type { BeachballConfig } from 'beachball';
import * as fs from 'fs';
import * as path from 'path';

import { renderHeader, renderEntry } from './customRenderers';

const baseConfig: typeof import('./base.config.json') = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'base.config.json'), { encoding: 'utf8' }),
);

export const config: typeof baseConfig & Required<Pick<BeachballConfig, 'changelog'>> = {
  ...baseConfig,
  changelog: {
    customRenderers: {
      renderHeader,
      renderEntry,
    },
  },
};
