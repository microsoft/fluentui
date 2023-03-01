import type { BeachballConfig } from 'beachball';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

import { renderHeader, renderEntry } from './customRenderers';

const baseConfig: typeof import('./base.config.json') = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'base.config.json'), { encoding: 'utf8' }),
);

export const config: typeof baseConfig & Required<Pick<BeachballConfig, 'changelog' | 'hooks'>> = {
  ...baseConfig,
  changelog: {
    customRenderers: {
      renderHeader,
      renderEntry,
    },
  },
  hooks: {
    precommit: () => {
      try {
        // Fixes any dependency mismatches caused by beachball scoping
        const cmd = 'yarn nx workspace-generator dependency-mismatch';
        const out = execSync(cmd);
        console.log(out.toString());
      } catch (err) {
        console.error(err);
      }
    },
  },
};
