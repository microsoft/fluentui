import { Tree, updateJson, generateFiles, joinPathFragments } from '@nx/devkit';
import path from 'path';

import { PackageJson, TsConfig } from '../../../types';
import { getProjectConfig } from '../../../utils';
import { uniqueArray } from './utils';

type Options = ReturnType<typeof getProjectConfig> & { rootOffset: string };

export function addFiles(tree: Tree, options: Options) {
  generateFiles(tree, joinPathFragments(__dirname, '../files'), options.projectConfig.root, {
    tmpl: '',
    options,
  });

  updateJson(tree, options.paths.tsconfig.main, (json: TsConfig) => {
    json.references?.push({
      path: `./${path.basename(options.paths.tsconfig.cypress)}`,
    });

    return json;
  });

  // update lib ts with new exclude globs
  updateJson(tree, options.paths.tsconfig.lib, (json: TsConfig) => {
    json.exclude = json.exclude || [];
    json.exclude.push(...['**/*.cy.ts', '**/*.cy.tsx']);
    json.exclude = uniqueArray(json.exclude);

    return json;
  });

  updateJson(tree, options.paths.packageJson, (json: PackageJson) => {
    json.devDependencies = json.devDependencies ?? {};
    json.devDependencies['@fluentui/scripts-cypress'] = '*';

    return json;
  });

  return tree;
}
