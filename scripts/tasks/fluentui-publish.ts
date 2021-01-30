import { argv, logger } from 'just-scripts';
import { spawnSync } from 'child_process';
import * as path from 'path';

import { findGitRoot } from '../monorepo/index';

export function fluentuiLernaPublish(bumpType) {
  return function () {
    const fluentRoot = path.resolve(findGitRoot(), 'packages', 'fluentui');
    const lernaPublishArgs = [
      'lerna',
      'publish',
      "--tag-version-prefix='@fluentui/react-northstar_v'", // HEADS UP: also see yarn stats:save in azure-pipelines.perf-test.yml
      '--no-git-reset',
      '--force-publish',
      '--registry',
      argv().registry,
      bumpType,
    ];

    logger.info(`Running this command: yarn ${lernaPublishArgs.join(' ')}`);

    const result = spawnSync('yarn', lernaPublishArgs, {
      cwd: fluentRoot,
      shell: true,
      stdio: 'inherit',
    });

    if (result.status) {
      throw new Error(result.error?.stack || `lerna publish failed with status ${result.status}`);
    }
  };
}

export function fluentuiLernaCustomPublish(version, tag) {
  if (!version) {
    throw new Error(`custom publish requires version to be specified`);
  }
  if (!tag) {
    throw new Error(`custom publish requires tag to be specified by using '--dist-tag <tag>`);
  }
  const fluentRoot = path.resolve(findGitRoot(), 'packages', 'fluentui');
  const lernaPublishArgs = [
    'lerna',
    'publish',
    version,
    "--tag-version-prefix='@fluentui/react-northstar_v'", // HEADS UP: also see yarn stats:save in azure-pipelines.perf-test.yml
    '--no-git-reset',
    '--force-publish',
    '--registry',
    argv().registry,
    '--dist-tag',
    tag,
  ];

  logger.info(`Running this command: yarn ${lernaPublishArgs.join(' ')}`);

  const result = spawnSync('yarn', lernaPublishArgs, {
    cwd: fluentRoot,
    shell: true,
    stdio: 'inherit',
  });

  if (result.status) {
    throw new Error(result.error?.stack || `lerna publish failed with status ${result.status}`);
  }
}
