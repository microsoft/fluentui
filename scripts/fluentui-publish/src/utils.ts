import { NxJsonConfiguration, ProjectGraph, ProjectGraphProjectNode, Tree, output } from '@nx/devkit';
import { /* getLatestGitTagForPattern, */ gitAdd, gitPush, gitTag } from 'nx/src/command-line/release/utils/git';

// TODO: Use API from nx (import above) once https://github.com/nrwl/nx/issues/26589 is fixed
import { getLatestGitTagForPattern } from './overrides/get-latest-git-tag';

// ==========  Expose internal nx APIs  =========
export { getGeneratorInformation } from 'nx/src/command-line/generate/generator-utils';
export { printAndFlushChanges } from 'nx/src/command-line/release/utils/print-changes';
export { gitPush, gitTag };
export { interpolate } from 'nx/src/tasks-runner/utils';
// ==============================================

export type NorthstarGroup = ReturnType<typeof getNorthstarGroup>;

export function getNorthstarGroup(graph: ProjectGraph) {
  const projectEntries = Object.entries(graph.nodes);
  const northstarProjects = projectEntries.reduce(
    (acc, [projectName, projectConfig]) => {
      const tags = projectConfig.data.tags ?? [];
      if (!tags.includes('react-northstar')) {
        return acc;
      }

      if (tags.includes('vNext')) {
        acc.crossBoundaryProjects[projectName] = projectConfig;
        return acc;
      }

      if (projectConfig.type !== 'lib') {
        acc.app[projectName] = projectConfig;
        return acc;
      }

      acc.lib[projectName] = projectConfig;

      return acc;
    },
    {
      lib: {} as { [projectName: string]: ProjectGraphProjectNode },
      app: {} as { [projectName: string]: ProjectGraphProjectNode },
      crossBoundaryProjects: {} as { [projectName: string]: ProjectGraphProjectNode },
    },
  );

  return northstarProjects;
}

export async function stageChanges(tree: Tree, args: { dryRun: boolean; verbose: boolean }) {
  output.logSingleLine(`Staging changed files with git because --stage-changes was set`);

  await gitAdd({
    changedFiles: tree.listChanges().map(f => f.path),
    dryRun: args.dryRun,
    verbose: args.verbose,
    logFn: console.log,
  });
}

export async function getLatestTag(tagPattern: string) {
  const latestTag = await getLatestGitTagForPattern(tagPattern);
  return latestTag;
}

export function getTagPattern(nxConfig: NxJsonConfiguration) {
  const TAG_PATTERN = nxConfig.release?.groups?.northstar.releaseTagPattern;

  if (!TAG_PATTERN) {
    throw new Error('northstar group definition is missing "releaseTagPattern"');
  }

  return TAG_PATTERN;
}
