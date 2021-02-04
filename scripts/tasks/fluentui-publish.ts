import { argv, logger } from 'just-scripts';
import { spawnSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

import { findGitRoot } from '../monorepo/index';

export function fluentuiLernaPublish(bumpType, skipConfirm = false) {
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
  if (skipConfirm) {
    lernaPublishArgs.push('--yes');
  }

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

const execCommandSync = (cwd: string, command: string, args: string[]) => {
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

export function fluentuiPostPublishValidation() {
  return function() {
    const gitRoot = findGitRoot();

    const branch = execCommandSync(gitRoot, 'git', ['branch', '--show-current']);
    execCommandSync(gitRoot, 'git', ['fetch', 'origin']);
    execCommandSync(gitRoot, 'git', ['reset', '--hard', `origin/${branch}`]); // sometimes lerna add gitHead in package.json after release

    // sync fluent version
    execCommandSync(gitRoot, 'yarn', ['syncpack:fix']);
    const gitStatus = execCommandSync(gitRoot, 'git', ['status']);
    if (!gitStatus.includes('nothing to commit, working tree clean')) {
      execCommandSync(gitRoot, 'git', ['add', `\*package.json`]);
      execCommandSync(gitRoot, 'git', ['commit', '-m', `"chore: fix dependencies after react-northstar release"`]);
      execCommandSync(gitRoot, 'git', ['push']);
    }

    // make sure there's no more than one fluent versions
    execCommandSync(gitRoot, 'yarn', ['syncpack:list']);
  };
}

// pack all public fluent ui packages, used by ci to store nightly built artifacts
const PUBLIC_FLUENT_PACKAGES = [
  'ability-attributes',
  'accessibility',
  'code-sandbox',
  'docs-components',
  'react-bindings',
  'react-builder',
  'react-component-event-listener',
  'react-component-nesting-registry',
  'react-component-ref',
  'react-context-selector',
  'react-icons-northstar',
  'react-northstar-emotion-renderer',
  'react-northstar-fela-renderer',
  'react-northstar-styles-renderer',
  'react-northstar',
  'react-proptypes',
  'react-telemetry',
  'state',
  'styles',
];
export function packFluentTarballs() {
  return function() {
    const gitRoot = findGitRoot();
    const tempFolderForPacks = path.resolve(gitRoot, 'fluentui-nightly');
    fs.mkdirSync(tempFolderForPacks);

    const packPackage = (packageName: string) => {
      const packageRoot = path.resolve(gitRoot, 'packages', 'fluentui', packageName);
      execCommandSync(tempFolderForPacks, 'npm', ['pack', packageRoot]);
    };

    PUBLIC_FLUENT_PACKAGES.forEach(packageName => {
      packPackage(packageName);
    });
  };
}
