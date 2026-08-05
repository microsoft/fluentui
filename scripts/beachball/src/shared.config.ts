import { execSync } from 'child_process';

import type { BeachballConfig } from 'beachball';

import { renderEntry, renderHeader } from './customRenderers';
import baseConfig from './base.config';

/**
 * Shared Beachball release config.
 */
export const config: typeof baseConfig & Required<Pick<BeachballConfig, 'branch' | 'changelog' | 'hooks'>> = {
  ...baseConfig,
  // This can't be in the base config because people might use different names for remotes,
  // but it should be safe in release pipelines.
  branch: 'origin/master',
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
