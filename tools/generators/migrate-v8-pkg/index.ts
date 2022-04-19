import * as path from 'path';
import { Tree, formatFiles, installPackagesTask, names, generateFiles } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

import { getProjectConfig } from '../../utils';

import { MigrateV8PkgGeneratorSchema } from './schema';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: MigrateV8PkgGeneratorSchema) {
  await libraryGenerator(tree, { name: schema.name });

  const normalizedOptions = normalizeOptions(tree, schema);

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}

function normalizeOptions(tree: Tree, options: MigrateV8PkgGeneratorSchema) {
  const project = getProjectConfig(tree, { packageName: options.name });

  return {
    ...options,
    ...project,
    ...names(options.name),
  };
}

/**
 * NOTE: remove this if your generator doesn't process any static/dynamic templates
 */
function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    tmpl: '',
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    path.join(options.projectConfig.root, options.name),
    templateOptions,
  );
}
