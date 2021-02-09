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
export function packFluentTarballs() {
  return function() {
    const gitRoot = findGitRoot();
    const fluentRoot = path.resolve(findGitRoot(), 'packages', 'fluentui');

    const TODAY = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

    const fluentPackages = JSON.parse(
      execCommandSync(fluentRoot, '../../node_modules/.bin/lerna', ['ls', '--json']).toString(),
    );
    const fluentPackagesNames = fluentPackages.map(pkg => pkg.name);

    const replaceDepVersionWithNightlyUrl = (packageLocation, packageName) => {
      const packageJson = require(`${packageLocation}/package.json`);
      const dependencies = packageJson.dependencies || {};
      let hasFluentDependency = false;
      for (const depPkg of Object.keys(dependencies)) {
        if (fluentPackagesNames.includes(depPkg)) {
          hasFluentDependency = true;
          dependencies[depPkg] = `https://fluentsite.blob.core.windows.net/nightly-builds/${TODAY}/${depPkg.replace(
            '@fluentui/',
            'fluentui-',
          )}-${packageJson.version}.tgz`;
        }
      }

      if (hasFluentDependency) {
        fs.writeFileSync(path.resolve(packageLocation, 'package.json'), JSON.stringify(packageJson, null, 2));
      }
    };

    // pack all fluent public packages into a directory named process.env.FLUENTUITARBALLS in workspace
    const tempFolderForPacks = path.resolve(gitRoot, process.env.FLUENTUITARBALLS || 'fluentui-nightly');
    fs.mkdirSync(tempFolderForPacks);

    fluentPackages.forEach(fluentPackage => {
      if (!fluentPackage.private) {
        replaceDepVersionWithNightlyUrl(fluentPackage.location, fluentPackage.name);
        execCommandSync(tempFolderForPacks, 'npm', ['pack', fluentPackage.location]);
      }
    });
  };
}
