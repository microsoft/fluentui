import { Tree, joinPathFragments, writeJson } from '@nrwl/devkit';
import { NormalizedSchema } from '../types';
import * as templates from '../templates';

export function updateApiExtractorForLocalBuilds(tree: Tree, options: NormalizedSchema) {
  writeJson(tree, joinPathFragments(options.paths.configRoot, 'api-extractor.local.json'), templates.apiExtractorLocal);
  writeJson(tree, joinPathFragments(options.paths.configRoot, 'api-extractor.json'), templates.apiExtractor);

  return tree;
}
