import { argv, logger } from 'just-scripts';
import { spawnSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { EOL } from 'os';

import { findGitRoot } from '../monorepo/index';

export function fluentuiLernaPublish(bumpType) {
  return function() {
    fluentuiUpdateChangelog(bumpType);

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
  fluentuiUpdateChangelog(version);

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

const execCommandSync = (cwd, command, args) => {
  const result = spawnSync(command, args, {
    cwd,
    shell: true,
    stdio: 'pipe',
    encoding: 'utf-8',
  });
  if (result.status) {
    throw new Error(result.error?.stack || `'${command} ${args.join(' ')}' failed with status ${result.status}`);
  }
  return result.stdout;
};

async function fluentuiUpdateChangelog(bumpType) {
  const gitRoot = findGitRoot();

  const updateChangelog = newVersion => {
    const chglogPath = path.resolve(gitRoot, 'packages', 'fluentui', 'CHANGELOG.md');
    const lines = fs
      .readFileSync(chglogPath)
      .toString()
      .split(EOL);

    const newChglog = [];
    let prevVersion;
    let startLineNumForNewVersion = 0;
    for (const line of lines) {
      if (!prevVersion) {
        // read line and append to `newChglog` until the released changes, then overwrite changelog
        newChglog.push(line);

        if (line.startsWith('## [Unreleased]')) {
          startLineNumForNewVersion = newChglog.length;
        }

        if (line.startsWith('## [v')) {
          prevVersion = line.match(/## \[v(\d*\.\d*\.\d*)\]/)[1];
          newChglog.splice(
            startLineNumForNewVersion,
            0,
            ``,
            `### BREAKING CHANGES`,
            `### Fixes`,
            `### Features`,
            `### Performance`,
            `### Documentation`,
            `### Deprecations`,
            ``,
            `<!--------------------------------[ v${newVersion} ]------------------------------- -->`,
            `## [v${newVersion}](https://github.com/microsoft/fluentui/tree/@fluentui/react-northstar_v${newVersion}) (${
              new Date().toISOString().split('T')[0]
            })`,
            `[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-northstar_v${prevVersion}..@fluentui/react-northstar_v${newVersion})`,
          );

          fs.writeFileSync(chglogPath, newChglog.join(EOL) + EOL);
        }
      } else {
        // append lines to the overwritten changelog
        fs.appendFileSync(chglogPath, line + EOL);
      }
    }
  };

  const currVersion = require(path.resolve(findGitRoot(), 'packages', 'fluentui', 'react-northstar', 'package.json'))
    .version;
  const [_fullmatch, majorCurrVersion, minorCurrVersion, patchCurrVersion] = currVersion.match(/(\d*)\.(\d*)\.(\d*)/);

  let newVersion;
  if (bumpType === 'minor') {
    newVersion = `${majorCurrVersion}.${Number(minorCurrVersion) + 1}.${patchCurrVersion}`;
  } else if (bumpType === 'patch') {
    newVersion = `${majorCurrVersion}.${minorCurrVersion}.${Number(patchCurrVersion) + 1}`;
  } else {
    newVersion = bumpType;
  }

  updateChangelog(newVersion);

  // commit change to git
  execCommandSync(gitRoot, 'git', ['add', './packages/fluentui/CHANGELOG.md']);
  execCommandSync(gitRoot, 'git', ['commit', '-m', `"chore: prepare release react-northstar ${newVersion}"`]);
}

export function fluentuiPostPublishValidation() {
  return function() {
    const gitRoot = findGitRoot();
    execCommandSync(gitRoot, 'git', ['reset', '--hard']); // sometimes lerna add gitHead in package.json after release
    execCommandSync(gitRoot, 'yarn', ['scrub', '-y']);
    execCommandSync(gitRoot, 'yarn', ['install']);
    const gitStatus = execCommandSync(gitRoot, 'git', ['status']);
    if (!gitStatus.includes('nothing to commit, working tree clean')) {
      throw new Error(
        `changes detected after installing the newly released fluentui version. This is likely to be caused by older fluentui used in some projects`,
      );
    }
  };
}
