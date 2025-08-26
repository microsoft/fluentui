import yargs from 'yargs';

import { Args, ReactVersion, runCmd, CommandName, getMergedTemplate } from './shared';
import { setup, installDepsForReactRoot } from './setup';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

async function cli() {
  const args = parseArgs();

  // Handle install-only mode early (no scaffolding required)
  if (args.installDeps) {
    if (!args.react) {
      throw new Error('Missing required --react when installing dependencies');
    }
    // When --install-deps is used, merge defaults with optional user config and install deps under the react root
    const merged = getMergedTemplate(args.react, args.configPath);
    const { reactRootPath } = await installDepsForReactRoot(args.react, merged.dependencies, args.verbose);
    console.log(`[rit / v${args.react}] Dependencies installed under shared react root -> ${reactRootPath}.`);
    return;
  }

  const project = await setup(args);
  // If prepareOnly, do not run any commands. Optionally keep the project
  if (args.prepareOnly) {
    console.log(`[rit / v${args.react}] Prepared at: ${project.projectPath}`);
    return;
  }

  try {
    await executeSelectedCommands(project, args);
  } finally {
    // ensure cleanup is always called even if commands fail
    if (args.cleanup !== false) {
      project.cleanup();
    } else {
      if (args.run.length && args.projectId) {
        console.info('NOTE: "--no-cleanup" has no effect when reusing an existing prepared project via --project-id');
      }
    }
  }
}

async function executeSelectedCommands(project: Awaited<ReturnType<typeof setup>>, args: Required<Args>) {
  const commands = project.commands;
  const filter = args.run as CommandName[];
  const entries = Object.entries(commands).filter(([name]) => (filter as string[]).includes(name));
  if (!entries.length) {
    return;
  }
  const logHeader = `[rit / v${args.react}]`;
  console.log(`${logHeader} About to run the following commands sequentially:`);
  console.log(`${logHeader} Project path: ${project.projectPath}`);
  for (const [name, cmd] of entries) {
    console.log(`- ${name}: ${cmd}`);
  }
  for (const [name, cmd] of entries) {
    if (args.verbose) {
      console.log(`\n${logHeader} Running: ${name} -> ${cmd}:`);
    }
    await runCmd(cmd, { cwd: project.projectPath });
  }
}

function parseArgs(): Required<Args> {
  const argv = yargs(process.argv.slice(2))
    .scriptName('rit')
    .usage(
      'Usage:\n' +
        '  $0 --react <17|18|19> --run <e2e|type-check|test> [--run <...>] [--config <path/to/rit.config.js>] [--project-id <id>]\n' +
        '  $0 --react <17|18|19> --prepare-only [--project-id <id>] [--force] [--no-install]\n' +
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

  const prepareOnly = (argv['prepare-only'] as boolean | undefined) ?? false;
  const installFlag = (argv.install as boolean | undefined) ?? true;
  const noInstall = !installFlag;
  const installDeps = (argv['install-deps'] as boolean | undefined) ?? false;
  const force = (argv.force as boolean | undefined) ?? false;
  const projectId = argv['project-id'] as string | undefined;
  const react = argv.react as number | undefined as ReactVersion | undefined;
  const run = (argv.run as CommandName[] | undefined) ?? [];
  const verbose = (argv.verbose as boolean | undefined) ?? false;
  const cleanup = (argv.cleanup as boolean | undefined) ?? true;
  const configPath = resolveConfigPath();

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

  if (!installDeps && !prepareOnly && !run.length) {
    throw new Error('Provide at least one --run or use --prepare-only');
  }

  return {
    react,
    configPath: configPath ?? '',
    run,
    verbose,
    cleanup,
    prepareOnly,
    noInstall,
    installDeps,
    projectId: projectId ?? '',
    force,
  } satisfies Required<Args>;

  function resolveConfigPath(): string | undefined {
    const defaultConfigPath = resolve(process.cwd(), 'rit.config.js');

    if (argv.config) {
      const userProvidedConfigPath = resolve(process.cwd(), argv.config);
      if (!existsSync(userProvidedConfigPath)) {
        throw new Error(`Config not found at: ${userProvidedConfigPath}`);
      }
      return userProvidedConfigPath;
    }

    return existsSync(defaultConfigPath) ? defaultConfigPath : undefined;
  }
}

// Execute when invoked via bin script
cli().catch(err => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
