import { Tree, joinPathFragments, updateProjectConfiguration } from '@nrwl/devkit';
import { NormalizedSchema } from '../types';
import { getPackageType, uniqueArray } from '../utils';

export function updateNxWorkspace(tree: Tree, options: NormalizedSchema) {
  const packageType = getPackageType(tree, options);
  const tags = {
    web: 'platform:web',
    node: 'platform:node',
  };
  updateProjectConfiguration(tree, options.name, {
    ...options.projectConfig,
    sourceRoot: joinPathFragments(options.projectConfig.root, 'src'),
    tags: uniqueArray([...(options.projectConfig.tags ?? []), 'vNext', tags[packageType]]),
  });

  return tree;
}
