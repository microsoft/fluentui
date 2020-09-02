const { argv, logger } = require('just-scripts');
const { spawnSync } = require('child_process');
const path = require('path');

const findGitRoot = require('../monorepo/findGitRoot');

module.exports.fluentuiLernaPublish = function(bumpType) {
  return function() {
    const fluentRoot = path.resolve(findGitRoot(), 'packages', 'fluentui');
    const lernaPublishArgs = [
      'lerna',
      'publish',
      "--tag-version-prefix='@fluentui/react-northstar_v'", // HEADS UP: also see yarn stats:save in azure-pipelines.perf-test.yml
      '--no-git-reset',
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
      throw new Error(result.error || `lerna publish failed with status ${result.status}`);
    }
  };
};
