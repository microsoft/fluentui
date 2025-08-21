import yargs from 'yargs';

import { Args, ReactVersion, resolveTemplatePath, runCmd, CommandName } from './shared';
import { setup } from './setup';

async function cli() {
  const args = parseArgs();

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
      if (args.useExistingProjectId) {
        console.info('NOTE: "--no-cleanup" has no effect when running via "--use-existing-project-id"');
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
        '  $0 --react <17|18|19> --run <e2e|type-check|test> [--run <...>] [--template <relative/path.json>]\n' +
        '  $0 --react <17|18|19> --prepare-only [--project-id <id>] [--force]\n' +
        '  $0 --react <17|18|19> --use-existing-project-id <project-id> --run <e2e|type-check|test> [--run <...>]',
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
    .option('template', {
      type: 'string',
      describe: 'Relative path to a custom template JSON to use',
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
    .option('use-existing-project-id', {
      type: 'string',
      describe: 'Run using an already prepared project (skips prepare) by providing the project-id suffix',
    })
    .option('project-id', {
      type: 'string',
      describe: 'Optional deterministic suffix for the prepared project folder name',
    })
    .option('force', {
      type: 'boolean',
      describe: 'When preparing, remove any existing prepared folder first',
      default: false,
    })
    .strict()
    .help()
    .parse();

  const useExistingProjectId = argv['use-existing-project-id'] as string | undefined;
  const prepareOnly = (argv['prepare-only'] as boolean | undefined) ?? false;
  const force = (argv['force'] as boolean | undefined) ?? false;
  const projectId = argv['project-id'] as string | undefined;
  let react = argv.react as number | undefined as ReactVersion | undefined;
  let templatePath: string | undefined = undefined;
  const run = (argv.run as CommandName[] | undefined) ?? [];
  const verbose = (argv.verbose as boolean | undefined) ?? false;
  const cleanup = (argv.cleanup as boolean | undefined) ?? true;

  if (useExistingProjectId) {
    if (!run.length) {
      throw new Error('When using "--use-existing-project-id" you must provide at least one "--run"');
    }
    if (!react) {
      throw new Error(
        'When using "--use-existing-project-id" you must also provide "--react" to resolve the prepared folder',
      );
    }
    return {
      // react/templatePath not required for run-only
      react: (react ?? 19) as ReactVersion,
      templatePath: '',
      run,
      verbose,
      cleanup,
      prepareOnly,
      useExistingProjectId,
      projectId: projectId ?? '',
      force,
    };
  }

  if (!react) {
    throw new Error('Missing required --react when preparing a project');
  }
  templatePath = resolveTemplatePath(argv.template as string | undefined, react);

  if (!prepareOnly && !run.length) {
    throw new Error('Provide at least one --run or use --prepare-only');
  }

  return {
    react,
    templatePath,
    run,
    verbose,
    cleanup,
    prepareOnly,
    useExistingProjectId,
    projectId: projectId ?? '',
    force,
  } as Required<Args>;
}

// Execute when invoked via bin script
cli().catch(err => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
