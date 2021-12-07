import { Tree } from '@nrwl/devkit';
import { NormalizedSchema } from '../types';
import * as templates from '../templates';

export function updateNpmIgnore(tree: Tree, options: NormalizedSchema) {
  tree.write(options.paths.npmConfig, templates.npmignore);

  return tree;
}
