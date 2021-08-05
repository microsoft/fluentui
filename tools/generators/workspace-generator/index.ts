import * as path from 'path';
import { Tree, formatFiles, generateFiles, names, offsetFromRoot } from '@nrwl/devkit';

import { WorkspaceGeneratorGeneratorSchema } from './schema';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (host: Tree, schema: WorkspaceGeneratorGeneratorSchema) {
  const options = normalizeOptions(host, schema);

  addFiles(host, options);

  if (!options.skipFormat) {
    await formatFiles(host);
  }
}

function normalizeOptions(host: Tree, options: WorkspaceGeneratorGeneratorSchema) {
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

function addFiles(host: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    tmpl: '',
  };

  generateFiles(
    host,
    path.join(__dirname, 'files'),
    path.join(options.paths.generators, options.name),
    templateOptions,
  );
}
