import type { CommandModule } from 'yargs';

import type { UsageArgs } from '../impl/types';

const usageCommand: CommandModule<{}, UsageArgs> = {
  command: 'usage',
  describe: 'Deep codebase usage analysis of Fluent UI APIs',
  builder: yargs =>
    yargs
      .option('path', {
        alias: 'p',
        type: 'string',
        describe: 'Root path for file traversal (defaults to git root)',
      })
      .option('reporter', {
        alias: 'r',
        type: 'string',
        choices: ['json', 'markdown', 'html'] as const,
        default: 'json' as const,
        describe: 'Output format',
      })
      .option('include', {
        type: 'string',
        array: true,
        describe: 'Glob patterns to include files',
      })
      .option('exclude', {
        type: 'string',
        array: true,
        describe: 'Glob patterns to exclude files',
      })
      .version(false)
      .help(),
  handler: async argv => {
    const { runLongReport } = await import('../impl/long-report');
    return runLongReport(argv.path, argv.reporter, argv.include, argv.exclude);
  },
};

export default usageCommand;
