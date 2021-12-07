import { Tree, visitNotIgnoredFiles } from '@nrwl/devkit';
import { NormalizedSchema } from '../types';

export function isJs(tree: Tree, options: NormalizedSchema) {
  const jsSourceFiles: string[] = [];
  visitNotIgnoredFiles(tree, options.paths.sourceRoot, treePath => {
    if (treePath.endsWith('.js') || treePath.endsWith('.jsx')) {
      jsSourceFiles.push(treePath);
    }
  });

  return jsSourceFiles.length > 0;
}
