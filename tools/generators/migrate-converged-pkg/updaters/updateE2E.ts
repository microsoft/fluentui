import { Tree, updateJson, joinPathFragments, writeJson } from '@nrwl/devkit';
import * as path from 'path';
import { PackageJson, TsConfig } from '../../../types';
import * as templates from '../templates';
import { NormalizedSchema } from '../types';

export function updateE2E(tree: Tree, options: NormalizedSchema) {
  if (!shouldUpdateE2E(tree, options)) {
    return tree;
  }

  tree.rename(joinPathFragments(options.paths.e2e.rootFolder, 'tsconfig.json'), options.paths.e2e.tsconfig);

  writeJson<TsConfig>(tree, options.paths.e2e.tsconfig, templates.e2e.tsconfig);

  updateJson(tree, options.paths.tsconfig.main, (json: TsConfig) => {
    json.references?.push({
      path: `./${path.basename(options.paths.e2e.rootFolder)}/${path.basename(options.paths.e2e.tsconfig)}`,
    });

    return json;
  });

  updateJson(tree, options.paths.packageJson, (json: PackageJson) => {
    json.scripts = json.scripts ?? {};
    json.scripts.e2e = 'e2e';

    return json;
  });

  return tree;
}

function shouldUpdateE2E(tree: Tree, options: NormalizedSchema) {
  return (
    tree.exists(joinPathFragments(options.paths.e2e.rootFolder, 'tsconfig.json')) ||
    tree.exists(options.paths.e2e.tsconfig)
  );
}
