import { Tree, formatFiles, names, joinPathFragments } from '@nx/devkit';

import { getProjectConfig, printUserLogs, UserLog } from '../../utils';

import type { CypressComponentConfigurationGeneratorSchema } from './schema';

import { assertStoriesProject } from '../split-library-in-two/shared';

import { addFiles } from './lib/add-files';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface _NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: CypressComponentConfigurationGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, schema);

  const isSplitProject = tree.exists(
    joinPathFragments(normalizedOptions.projectConfig.root, '../stories/project.json'),
  );

  if (!assertOptions(tree, { isSplitProject, ...normalizedOptions })) {
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

function assertOptions(tree: Tree, options: ReturnType<typeof normalizeOptions> & { isSplitProject: boolean }) {
  if (options.projectConfig.projectType === 'application') {
    const userLog: UserLog = [];
    userLog.push({ type: 'warn', message: `We don't support cypress component tests for applications` });
    printUserLogs(userLog);

    return false;
  }

  assertStoriesProject(tree, { isSplitProject: options.isSplitProject, project: options.projectConfig });

  return true;
}
