import { stripIndents, Tree } from '@nrwl/devkit';

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
