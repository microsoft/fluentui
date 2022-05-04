import { stripIndents, Tree } from '@nrwl/devkit';
import type { Chalk } from 'chalk';

import { workspacePaths } from './utils';

export function setupCodeowners(tree: Tree, options: { withPlaceholder?: boolean; content: string }) {
  const { withPlaceholder, content } = { withPlaceholder: true, ...options };

  tree.write(
    workspacePaths.github.codeowners,
    stripIndents`
      ${content}
      ${withPlaceholder ? '# <%= NX-CODEOWNER-PLACEHOLDER %>' : ''}
    `,
  );

  return tree;
}

export function disableChalk(chalkInstance: Chalk) {
  chalkInstance.level = 0;
}

export function formatMockedCalls(values: string[][]) {
  return values
    .flat()
    .map(line => line.trim())
    .join('\n');
}
