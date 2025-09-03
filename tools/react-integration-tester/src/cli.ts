import { type Args, type CommandName, runCmd } from './shared';
import { installDepsForReactVersion, setup } from './setup';
import { parseArgs } from './args';
import { createLogger, type Logger } from './logger';

export async function cli() {
  const args = parseArgs(process.argv.slice(2));
  const logger = createLogger(args);

  // Handle install-only mode early (no scaffolding required)
  if (args.installDeps) {
    if (!args.react) {
      throw new Error('Missing required --react when installing dependencies');
    }
    // When --install-deps is used, prepare and install deps under the react root
    await installDepsForReactVersion(args, logger);
    return;
  }

  const project = await setup(args, logger);
  // If prepareOnly, do not run any commands. Optionally keep the project
  if (args.prepareOnly) {
    logger.log('Prepared at:', project.projectPath);
    return;
  }

  try {
    await executeSelectedCommands(project, args, logger);
  } finally {
    // ensure cleanup is always called even if commands fail
    if (args.cleanup !== false) {
      project.cleanup();
    } else {
      if (args.run.length && args.projectId) {
        logger.info('NOTE: "--no-cleanup" has no effect when reusing an existing prepared project via --project-id');
      }
    }
  }
}

async function executeSelectedCommands(
  project: Awaited<ReturnType<typeof setup>>,
  args: Required<Args>,
  logger: Logger,
) {
  const commands = project.commands;
  const filter = args.run as CommandName[];
  const entries = Object.entries(commands).filter(([name]) => (filter as string[]).includes(name));
  if (!entries.length) {
    return;
  }
  logger.log('About to run the following commands sequentially:');
  logger.log('Project path:', project.projectPath);
  for (const [name, cmd] of entries) {
    logger.log('-', `${name}:`, cmd);
  }
  for (const [name, cmd] of entries) {
    logger.verbose('\nRunning:', name, '->', cmd + ':');
    await runCmd(cmd, { cwd: project.projectPath });
  }
}
