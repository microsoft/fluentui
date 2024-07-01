import {
  NxJsonConfiguration,
  ProjectGraphProjectNode,
  joinPathFragments,
  output,
  readJsonFile,
  workspaceRoot,
} from '@nx/devkit';
import { releasePublish } from 'nx/release';

import { NorthstarGroup, getLatestTag, getTagPattern, gitPush, gitTag, interpolate } from './utils';

type NxReleasePublishArgs = Parameters<typeof releasePublish>[0];
export type PublishArgs = Required<Pick<NxReleasePublishArgs, 'dryRun' | 'verbose'>>;

export async function publish(config: { args: PublishArgs; group: NorthstarGroup; nxConfig: NxJsonConfiguration }) {
  const { args, group, nxConfig } = config;

  await tagRelease(args);

  await releasePublish({
    dryRun: args.dryRun,
    verbose: args.verbose,
    registry: 'https://registry.npmjs.org',
    groups: ['northstar'],
  });

  // ======= utils ========

  async function tagRelease(options: PublishArgs) {
    const tagPattern = getTagPattern(nxConfig);
    const latestTag = await getLatestTag(tagPattern);

    const newWorkspaceVersion = getNewFixedVersion(group.lib);

    if (latestTag?.extractedVersion === newWorkspaceVersion) {
      output.logSingleLine(`tag:${latestTag?.tag} already exist, skipping tagging`);
      return;
    }

    const tag = interpolate(tagPattern, { version: ' ', projectName: ' ' }).trim() + newWorkspaceVersion;

    await gitTag({ tag, dryRun: options.dryRun, verbose: options.verbose });
    await gitPush({ dryRun: options.dryRun, verbose: options.verbose });
  }

  function getNewFixedVersion(projects: { [projectName: string]: ProjectGraphProjectNode }) {
    const updatedLibProjectName = Object.keys(projects)[0];
    const updatedLibProject = projects[updatedLibProjectName];
    const pkgJsonPath = joinPathFragments(workspaceRoot, updatedLibProject.data.root, 'package.json');
    const json = readJsonFile(pkgJsonPath);

    return json.version;
  }
}
