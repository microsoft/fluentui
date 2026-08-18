import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Alias } from 'vite';

/**
 * Builds Vite aliases from the workspace's TypeScript path mappings.
 *
 * Storybook resolves `@fluentui/*` to source via `TsconfigPathsPlugin`; this is the Vite
 * equivalent. Without it the site resolves those packages through node, which requires every
 * component package to have been built first — so a clean checkout fails, and a stale `lib/`
 * silently wins over the source you are editing.
 *
 * Exact mappings are emitted before wildcard ones so `@fluentui/react-components` cannot be
 * captured by a broader `@fluentui/react-components/*` rule.
 */
export function tsconfigAliases(tsconfigPath: string, repoRoot: string): Alias[] {
  const { compilerOptions } = JSON.parse(readFileSync(tsconfigPath, 'utf8')) as {
    compilerOptions: { paths?: Record<string, string[]> };
  };

  const paths = compilerOptions.paths ?? {};
  const exact: Alias[] = [];
  const wildcard: Alias[] = [];

  for (const [specifier, [target]] of Object.entries(paths)) {
    if (!target) {
      continue;
    }

    if (specifier.endsWith('/*')) {
      const prefix = escapeRegExp(specifier.slice(0, -2));

      wildcard.push({
        find: new RegExp(`^${prefix}/(.*)$`),
        replacement: join(repoRoot, target.replace(/\*/, '$1')),
      });

      continue;
    }

    exact.push({
      find: new RegExp(`^${escapeRegExp(specifier)}$`),
      replacement: join(repoRoot, target),
    });
  }

  return [...exact, ...wildcard];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
