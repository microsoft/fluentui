import { execSync } from 'child_process';

import type { BeachballConfig } from 'beachball';

import { renderEntry, renderHeader } from './customRenderers';
import * as baseConfig from './base.config';

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
        const generators = [
          // Fixes any dependency mismatches caused by beachball scoping
          'dependency-mismatch',
          // Fixes unwanted pre-release dependency bumps caused by beachball
          'normalize-package-dependencies',
        ];

        generators.forEach(generator => {
          const cmd = `yarn nx g @fluentui/workspace-plugin:${generator}`;
          const out = execSync(cmd);
          console.log(out.toString());
        });

        const out = execSync('yarn install --mode=update-lockfile');
        console.log(out.toString());
      } catch (err) {
        console.error(err);
      }
    },
  },
};
