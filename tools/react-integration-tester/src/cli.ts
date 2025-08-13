import yargs from 'yargs';

import { Args, ReactVersion, resolveTemplatePath, runCmd, CommandName } from './shared';
import { setup } from './setup';

async function cli() {
  const args = parseArgs();

  const project = await setup(args);
  try {
    await executeSelectedCommands(project, args);
  } finally {
    // ensure cleanup is always called even if commands fail
    if (args.cleanup !== false) {
      project.cleanup();
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
    .usage('Usage: $0 --react <17|18|19> --run <e2e|type-check|test> [--run <...>] [--template <relative/path.json>]')
    .option('react', {
      type: 'number',
      describe: 'React major version to target',
      choices: [17, 18, 19],
      demandOption: true,
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
      demandOption: true,
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
    .strict()
    .help()
    .parse();

  const react = argv.react as number as ReactVersion;
  const templatePath = resolveTemplatePath(argv.template as string | undefined, react);
  const run = argv.run as CommandName[];
  const verbose = (argv.verbose as boolean | undefined) ?? false;
  const cleanup = (argv.cleanup as boolean | undefined) ?? true;

  return { react, templatePath, run, verbose, cleanup };
}

// Execute when invoked via bin script
cli().catch(err => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
