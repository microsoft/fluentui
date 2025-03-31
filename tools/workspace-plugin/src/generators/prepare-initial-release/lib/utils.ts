import type { Tree } from '@nx/devkit';
import ignore from 'ignore';
import { join, relative, sep } from 'node:path';

/**
 * Utility to act on all files in a tree that are not ignored by git.
 * copied from https://github.com/nrwl/nx/blob/master/packages/devkit/src/generators/visit-not-ignored-files.ts
 * utility override from original in order to process files that are ignored within .nxignore
 */
export function visitNotGitIgnoredFiles(tree: Tree, dirPath = tree.root, visitor: (path: string) => void): void {
  // TODO (v17): use packages/nx/src/utils/ignore.ts
  let ig = ignore();
  if (tree.exists('.gitignore')) {
    // ig = ignore();
    ig.add('.git');
    ig.add(tree.read('.gitignore', 'utf-8')!);
  }
  // if (tree.exists('.nxignore')) {
  //   ig ??= ignore();
  //   ig.add(tree.read('.nxignore', 'utf-8')!);
  // }
  dirPath = normalizePathRelativeToRoot(dirPath, tree.root);

  if (dirPath !== '' && ig?.ignores(dirPath)) {
    return;
  }

  for (const child of tree.children(dirPath)) {
    const fullPath = join(dirPath, child);
    if (ig?.ignores(fullPath)) {
      continue;
    }
    if (tree.isFile(fullPath)) {
      visitor(fullPath);
    } else {
      visitNotGitIgnoredFiles(tree, fullPath, visitor);
    }
  }
}

function normalizePathRelativeToRoot(path: string, root: string): string {
  return relative(root, join(root, path)).split(sep).join('/');
}
