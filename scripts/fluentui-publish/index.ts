import { spawnSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { argv } from 'yargs';

import { findGitRoot } from '../monorepo/index';

export function fluentuiLernaPublish(bumpType, skipConfirm = false, npmTagForCanary = 'beta') {
  const gitRoot = findGitRoot();
  const fluentRoot = path.resolve(gitRoot, 'packages', 'fluentui');

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
        'https://registry.npmjs.org',
        '--no-verify-access', // Lerna doesn't work with NPM automation tokens (https://github.com/lerna/lerna/issues/2788)
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
        '--no-git-tag-version',
        '--no-git-reset',
        '--force-publish',
        '--registry',
        'https://registry.npmjs.org',
        '--dist-tag',
        npmTagForCanary,
        '--preid',
        npmTagForCanary,
        '--no-verify-access', // Lerna doesn't work with NPM automation tokens (https://github.com/lerna/lerna/issues/2788)
      ];
      break;
    default:
      throw new Error(`lerna publish gets invalid bump type ${bumpType}`);
  }

  if (skipConfirm) {
    lernaPublishArgs.push('--yes');
  }

  console.log(`Running this command: yarn ${lernaPublishArgs.join(' ')}`);

  const result = spawnSync('yarn', lernaPublishArgs, {
    cwd: fluentRoot,
    shell: true,
    stdio: 'inherit',
  });

  if (bumpType === 'canary') {
    // in canary release lerna doesn't push the version change in lerna.json to remote
    execCommandSync(gitRoot, 'git', ['add', `packages/fluentui/lerna.json`]);
    execCommandSync(gitRoot, 'git', [
      'commit',
      '-m',
      `"chore: update lerna.json after react-northstar canary release"`,
    ]);
    execCommandSync(gitRoot, 'git', ['push']);
  }

  if (result.status) {
    throw new Error(`lerna publish failed with status ${result.status}\nstderr: ${result.stderr}`);
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
    throw new Error(`'${command} ${args.join(' ')}' failed with status ${result.status}\nstderr: ${result.stderr}`);
  }
  return result.stdout;
};

export function fluentuiPostPublishValidation() {
  const gitRoot = findGitRoot();

  const branch = execCommandSync(gitRoot, 'git', ['branch', '--show-current']);
  execCommandSync(gitRoot, 'git', ['fetch', 'origin']);
  execCommandSync(gitRoot, 'git', ['reset', '--hard', `origin/${branch}`]); // sometimes lerna add gitHead in package.json after release

  // sync fluent version
  execCommandSync(gitRoot, 'yarn', ['syncpack fix-mismatches']);
  const gitStatus = execCommandSync(gitRoot, 'git', ['status', '--porcelain', `\\*package.json`]);
  if (gitStatus.length !== 0) {
    execCommandSync(gitRoot, 'git', ['add', `\\*package.json`]);
    execCommandSync(gitRoot, 'git', ['commit', '-m', `"chore: fix dependencies after react-northstar release"`]);
    execCommandSync(gitRoot, 'git', ['push']);
  }

  // make sure there's no more than one fluent versions
  execCommandSync(gitRoot, 'yarn', ['syncpack', 'list-mismatches']);
}

// pack all public fluent ui packages, used by ci to store nightly built artifacts
export function packFluentTarballs() {
  const gitRoot = findGitRoot();
  const fluentRoot = path.resolve(findGitRoot(), 'packages', 'fluentui');

  const TODAY = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

  const fluentPackages = JSON.parse(
    execCommandSync(fluentRoot, '../../node_modules/.bin/lerna', ['ls', '--json']).toString(),
  );
  const fluentPackagesNames = fluentPackages.map(pkg => pkg.name);

  const replaceDepVersionWithNightlyUrl = packageLocation => {
    const packageJson = require(`${packageLocation}/package.json`);
    packageJson.version = `0.0.0-nightly+${TODAY}`;
    const dependencies = packageJson.dependencies || {};

    for (const depPkg of Object.keys(dependencies)) {
      if (fluentPackagesNames.includes(depPkg)) {
        dependencies[depPkg] = `https://fluentsite.blob.core.windows.net/nightly-builds/${TODAY}/${depPkg.replace(
          '@fluentui/',
          'fluentui-',
        )}-0.0.0-nightly.tgz`;
      }
    }

    fs.writeFileSync(path.resolve(packageLocation, 'package.json'), JSON.stringify(packageJson, null, 2));
  };

  // pack all fluent public packages into azure pipeline Build.ArtifactStagingDirectory
  // This directory is purged before each new build
  if (!process.env.BUILD_ARTIFACTSTAGINGDIRECTORY) {
    throw new Error(`Cannot find environment variable BUILD_ARTIFACTSTAGINGDIRECTORY`);
  }
  const tempFolderForPacks = path.resolve(gitRoot, process.env.BUILD_ARTIFACTSTAGINGDIRECTORY);
  if (!fs.existsSync(tempFolderForPacks)) {
    throw new Error(`BUILD_ARTIFACTSTAGINGDIRECTORY ${tempFolderForPacks} does not exist`);
  }

  fluentPackages.forEach(fluentPackage => {
    if (!fluentPackage.private) {
      replaceDepVersionWithNightlyUrl(fluentPackage.location);
      execCommandSync(tempFolderForPacks, 'npm', ['pack', fluentPackage.location]);
    }
  });

  // some packages.json maybe modified, discard these changes
  execCommandSync(gitRoot, 'git', ['checkout', '-f']);
}

function run() {
  const task = argv._[0];
  const skipConfirm = !!argv['yes'];
  const tag = argv['dist-tag'] as string;

  switch (task) {
    case 'pack-nightly':
      packFluentTarballs();
      break;
    case 'publish-canary':
      fluentuiLernaPublish('canary', skipConfirm, tag);
      break;

    case 'publish-patch':
      fluentuiLernaPublish('patch', skipConfirm);
      break;

    case 'publish-minor':
      fluentuiLernaPublish('minor', skipConfirm);
      break;

    case 'post-publish':
      fluentuiPostPublishValidation();
      break;

    default:
      throw new Error(`fluent ui publish script does not recognize task '${task}'`);
  }
}
run();
