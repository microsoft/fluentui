import { spawnSync } from 'child_process';
import * as path from 'path';

import { workspaceRoot } from '@fluentui/scripts-monorepo';
import * as yargs from 'yargs';

main();

function fluentuiLernaPublish(bumpType: 'patch' | 'minor', skipConfirm = false, npmTagForCanary = 'beta') {
  const fluentRoot = path.resolve(workspaceRoot, 'packages', 'fluentui');

  let lernaPublishArgs: string[];
  switch (bumpType) {
    case 'patch':
    case 'minor':
      lernaPublishArgs = [
        'lerna',
        'publish',
        bumpType,
        "--tag-version-prefix='@fluentui/react-northstar_v'", // HEADS UP: also see yarn northstar:stats:save in azure-pipelines.perf-test.yml
        '--no-git-reset',
        '--force-publish',
        '--registry',
        'https://registry.npmjs.org',
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

function fluentuiPostPublishValidation() {
  const gitRoot = workspaceRoot;

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

/**
 * publish CLI for @fluentui/react-northstar
 */
function main() {
  const args = processArgs();
  const command = args._[0];

  if (command === 'bump') {
    const { semverType, yes, distTag, postValidate } = args as unknown as {
      semverType: 'patch' | 'minor';
      distTag?: string;
      yes: boolean;
      postValidate: boolean;
    };

    fluentuiLernaPublish(semverType, yes, distTag);
    postValidate && fluentuiPostPublishValidation();

    return;
  }

  throw new Error(`Invalid command/arguments provided`);
}

function processArgs() {
  const args = yargs
    .scriptName('northstar-publish')
    .command('bump <semver-type>', 'Publish packages', _yargs => {
      _yargs
        .positional('semver-type', {
          description: 'Increment version(s) by semver keyword',
          choices: ['patch', 'minor'] as const,
          demandOption: true,
        })
        .option('yes', {
          type: 'boolean',
          default: false,
          description: 'skip lerna prompts',
        })
        .option('post-validate', {
          type: 'boolean',
          default: true,
          description: 'execute validation steps after publish',
        })
        .option('dist-tag', {
          type: 'string',
          description: 'tag for canary release',
        });
    })
    .demandCommand(1)
    .strict()
    .version(false)
    .help().argv;

  return args;
}
