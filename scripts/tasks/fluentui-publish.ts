import { argv, logger } from 'just-scripts';
import { spawnSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

import { findGitRoot } from '../monorepo/index';

export function fluentuiLernaPublish(bumpType, skipConfirm = false, npmTagForCanary = 'beta') {
  const fluentRoot = path.resolve(findGitRoot(), 'packages', 'fluentui');

  let lernaPublishArgs: string[];
  switch (bumpType) {
    case 'patch':
    case 'minor':
      lernaPublishArgs = [
        'lerna',
        'publish',
        "--tag-version-prefix='@fluentui/react-northstar_v'", // HEADS UP: also see yarn stats:save in azure-pipelines.perf-test.yml
        '--no-git-reset',
        '--force-publish',
        '--registry',
        argv().registry,
        bumpType,
      ];
      break;
    case 'canary':
      if (npmTagForCanary.includes('latest')) {
        throw new Error(`Canary release cannot be published under latest tag`);
      }
      lernaPublishArgs = [
        'lerna',
        'publish',
        'prerelease',
        "--tag-version-prefix='@fluentui/react-northstar_v'",
        '--no-push',
        '--no-git-tag-version',
        '--no-git-reset',
        '--force-publish',
        '--registry',
        argv().registry,
        '--dist-tag',
        npmTagForCanary,
        '--preid',
        npmTagForCanary,
      ];
      break;
    default:
      throw new Error(`lerna publish gets invalid bump type ${bumpType}`);
  }

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
    const gitStatus = execCommandSync(gitRoot, 'git', ['status', '--porcelain']);
    if (gitStatus.length === 0) {
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

const TODAY = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

const replaceDepVersionWithNightlyUrl = (packageRoot, packageName) => {
  const packageJson = require(`@fluentui/${packageName}/package.json`);
  const dependencies = packageJson.dependencies || {};
  let hasFluentDependency = false;
  for (const key of Object.keys(dependencies)) {
    if (key.startsWith('@fluentui/') && PUBLIC_FLUENT_PACKAGES.includes(fluentPackageName)) {
      const fluentPackageName = key.substring('@fluentui/'.length);
      hasFluentDependency = true;
      dependencies[
        key
      ] = `https://fluentsite.blob.core.windows.net/nightly-builds/${TODAY}/fluentui-${fluentPackageName}-${packageJson.version}.tgz`;
    }
  }

  if (hasFluentDependency) {
    fs.writeFileSync(path.resolve(packageRoot, 'package.json'), JSON.stringify(packageJson, null, 2));
  }
};

export function packFluentTarballs() {
  return function() {
    const gitRoot = findGitRoot();
    const tempFolderForPacks = path.resolve(gitRoot, 'fluentui-nightly');
    fs.mkdirSync(tempFolderForPacks);

    const packPackage = (packageName: string) => {
      const packageRoot = path.resolve(gitRoot, 'packages', 'fluentui', packageName);
      replaceDepVersionWithNightlyUrl(packageRoot, packageName);
      execCommandSync(tempFolderForPacks, 'npm', ['pack', packageRoot]);
    };

    PUBLIC_FLUENT_PACKAGES.forEach(packageName => {
      packPackage(packageName);
    });
  };
}
