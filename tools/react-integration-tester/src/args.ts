import yargs from 'yargs';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

import { type Args, type ReactVersion, type CommandName } from './shared';

export function parseArgs(processArgs: string[]): Required<Args> {
  const argv = yargs(processArgs)
    .scriptName('rit')
    .usage(
      'Usage:\n' +
        '  $0 --react <17|18|19> --run <e2e|type-check|test> [--run <...>] [--config <path/to/rit.config.js>] [--project-id <id>]\n' +
        '  $0 --react <17|18|19> --prepare-only --project-id <id> [--force] [--no-install]\n' +
        '  $0 --react <17|18|19> --install-deps    # installs deps under react-XX root and exits\n' +
        '  # Example: run tests against an existing prepared scaffold\n' +
        '  $0 --react <17|18|19> --project-id <id> --run test',
    )
    .option('react', {
      type: 'number',
      describe: 'React major version to target',
      choices: [17, 18, 19],
      demandOption: false,
      coerce: value => {
        if (Array.isArray(value)) {
          throw new Error('The --react option must be provided only once.');
        }
        return value;
      },
    })
    .option('config', {
      type: 'string',
      describe: 'Path to rit.config.js with per-react overrides (defaults to ./rit.config.js if present)',
    })
    .option('run', {
      type: 'array',
      describe: 'Subset of commands to run',
      choices: ['e2e', 'type-check', 'test'],
      demandOption: false,
    })
    .option('verbose', {
      type: 'boolean',
      describe: 'Enable verbose logging',
      default: false,
    })
    .option('cleanup', {
      type: 'boolean',
      describe: 'Cleanup the temporary project after run (use --no-cleanup to keep it)',
      default: true,
    })
    .option('cwd', {
      type: 'string',
      describe: 'Working directory to resolve project files from (defaults to current process cwd)',
    })
    .option('prepare-only', {
      type: 'boolean',
      describe: 'Prepare (scaffold + install) only; do not run any commands',
      default: false,
    })
    .option('install', {
      type: 'boolean',
      describe: 'When used with --prepare-only, install dependencies (use --no-install to skip)',
      default: true,
    })
    .option('install-deps', {
      type: 'boolean',
      describe: 'Only install dependencies for the selected React version root and exit',
      default: false,
    })
    .option('project-id', {
      type: 'string',
      describe:
        'Deterministic suffix for the prepared project folder name. With --prepare-only: used to name the scaffold. With --run: reuse an existing scaffold with this id (skips prepare).',
    })
    .option('force', {
      type: 'boolean',
      describe: 'When preparing, remove any existing prepared folder first',
      default: false,
    })
    .strict()
    .help()
    .parse();

  const prepareOnly = argv['prepare-only'] ?? false;
  const installFlag = argv.install ?? true;
  const noInstall = !installFlag;
  const installDeps = argv['install-deps'] ?? false;
  const force = argv.force ?? false;
  const projectId = argv['project-id'] ?? '';
  const react = argv.react as ReactVersion | undefined;
  const run = (argv.run ?? []) as CommandName[];
  const verbose = argv.verbose ?? false;
  const cleanup = argv.cleanup ?? true;
  const cwd = argv.cwd ?? process.cwd();
  const configPath = resolveConfigPath(cwd) ?? '';

  // Validate mutually exclusive flags with --run
  if (run.length) {
    if (prepareOnly) {
      throw new Error('Invalid combination: --prepare-only cannot be used together with --run');
    }
    if (noInstall === true) {
      throw new Error('Invalid combination: --no-install cannot be used together with --run');
    }
  }

  if (!react) {
    throw new Error('Missing required --react');
  }

  // Require project-id when preparing only; deterministic name is needed for reuse and clarity
  if (prepareOnly && !projectId) {
    throw new Error('Using --prepare-only requires --project-id');
  }

  if (!installDeps && !prepareOnly && !run.length) {
    throw new Error('Provide at least one --run or use --prepare-only');
  }

  return {
    react,
    configPath,
    run,
    verbose,
    cleanup,
    cwd,
    prepareOnly,
    noInstall,
    installDeps,
    projectId,
    force,
  } satisfies Required<Args>;

  function resolveConfigPath(projectRoot: string): string | undefined {
    const defaultConfigPath = resolve(projectRoot, 'rit.config.js');

    if (argv.config) {
      const userProvidedConfigPath = resolve(projectRoot, argv.config);
      if (!existsSync(userProvidedConfigPath)) {
        throw new Error(`Config not found at: ${userProvidedConfigPath}`);
      }
      return userProvidedConfigPath;
    }

    return existsSync(defaultConfigPath) ? defaultConfigPath : undefined;
  }
}
