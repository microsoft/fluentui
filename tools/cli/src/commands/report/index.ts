import type { CommandModule } from 'yargs';

import type { ReportArgs } from './impl/types';

const command: CommandModule<{}, ReportArgs> = {
  command: 'report',
  describe: 'Generate reports',
  builder: yargs =>
    yargs
      .option('type', {
        alias: 't',
        type: 'string',
        choices: ['short', 'long'] as const,
        default: 'short' as const,
        describe: 'Report type: "short" for issue reporting, "long" for codebase analysis',
      })
      .option('path', {
        alias: 'p',
        type: 'string',
        describe: 'Root path for file traversal (only valid with --type long)',
      })
      .option('reporter', {
        alias: 'r',
        type: 'string',
        choices: ['json', 'markdown', 'html'] as const,
        default: 'json' as const,
        describe: 'Output format for long report (only valid with --type long)',
      })
      .option('include', {
        type: 'array',
        string: true,
        describe: 'Glob patterns to include files (only valid with --type long)',
      })
      .option('exclude', {
        type: 'array',
        string: true,
        describe: 'Glob patterns to exclude files (only valid with --type long)',
      })
      .check(argv => {
        if (argv.path && argv.type !== 'long') {
          throw new Error('--path can only be used with --type long');
        }
        if (argv.reporter !== 'json' && argv.type !== 'long') {
          throw new Error('--reporter can only be used with --type long');
        }
        if (argv.include && argv.type !== 'long') {
          throw new Error('--include can only be used with --type long');
        }
        if (argv.exclude && argv.type !== 'long') {
          throw new Error('--exclude can only be used with --type long');
        }
        return true;
      })
      .version(false)
      .help(),
  handler: async argv => {
    const { handler } = await import('./handler');
    return handler(argv);
  },
};

export default command;
