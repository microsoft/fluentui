import type { CommandModule } from 'yargs';

import type { InfoArgs } from '../impl/types';

const infoCommand: CommandModule<{}, InfoArgs> = {
  command: 'info',
  describe: 'Quick package & environment summary for issue reporting',
  builder: yargs =>
    yargs
      .option('output', {
        alias: 'o',
        type: 'string',
        describe: 'Output file path (default: stdout)',
      })
      .version(false)
      .help(),
  handler: async argv => {
    const { runShortReport } = await import('../impl/short-report');
    return runShortReport(argv.output);
  },
};

export default infoCommand;
