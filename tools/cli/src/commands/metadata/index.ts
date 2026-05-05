import type { CommandModule } from 'yargs';

import type { MetadataArgs } from './impl/types';

const command: CommandModule<{}, MetadataArgs> = {
  command: 'metadata',
  describe: 'Extract API metadata from package .d.ts build output',
  builder: yargs =>
    yargs
      .option('entry', {
        alias: 'e',
        type: 'string',
        describe: 'Path to index.d.ts entry file (default: resolved from package.json "types" field)',
      })
      .option('reporter', {
        alias: 'r',
        type: 'string',
        choices: ['json', 'markdown', 'html'] as const,
        default: 'json' as const,
        describe: 'Output format',
      })
      .option('output', {
        alias: 'o',
        type: 'string',
        describe: 'Output file path (default: stdout)',
      })
      .version(false)
      .help(),
  handler: async argv => {
    const { handler } = await import('./handler');
    return handler(argv);
  },
};

export default command;
