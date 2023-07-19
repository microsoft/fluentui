import { Tree, formatFiles, names } from '@nx/devkit';

import { getProjectConfig, printUserLogs, UserLog } from '../../utils';

import type { CypressComponentConfigurationGeneratorSchema } from './schema';

import { addFiles } from './lib/add-files';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface _NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: CypressComponentConfigurationGeneratorSchema) {
  const userLog: UserLog = [];
  const normalizedOptions = normalizeOptions(tree, schema);

  if (normalizedOptions.projectConfig.projectType === 'application') {
    userLog.push({ type: 'warn', message: 'we dont support cypress component tests for applications' });
    printUserLogs(userLog);
    return;
  }

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);
}

function normalizeOptions(tree: Tree, options: CypressComponentConfigurationGeneratorSchema) {
  const project = getProjectConfig(tree, { packageName: options.project });

  return {
    ...options,
    ...project,
    ...names(options.project),
  };
}
