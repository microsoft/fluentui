import { Tree } from '@nrwl/devkit';
import { updateJestConfig } from '../../../utils';
import { NormalizedSchema } from '../types';

export function updateRootJestConfig(tree: Tree, options: NormalizedSchema) {
  updateJestConfig(tree, { project: options.name });

  return tree;
}
