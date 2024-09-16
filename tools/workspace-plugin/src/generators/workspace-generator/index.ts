import path from 'path';
import { Tree, formatFiles, generateFiles, names, offsetFromRoot } from '@nx/devkit';

import { WorkspaceGeneratorGeneratorSchema } from './schema';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: WorkspaceGeneratorGeneratorSchema) {
  const options = normalizeOptions(tree, schema);

  addFiles(tree, options);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}

function normalizeOptions(tree: Tree, options: WorkspaceGeneratorGeneratorSchema) {
  if (options.name.length === 0) {
    throw new Error('name is required');
  }

  const defaults = { skipFormat: false };
  const projectRoot = 'tools';

  return {
    ...defaults,
    ...options,
    projectRoot,
    paths: {
      generators: path.join(projectRoot, 'generators'),
    },
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    tmpl: '',
  };

  const projectRoot = path.join(options.paths.generators, options.name);

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, templateOptions);

  tree.write(path.join(projectRoot, 'files', 'constants.ts__tmpl__'), 'export const variable = "<%= name %>";');
}
