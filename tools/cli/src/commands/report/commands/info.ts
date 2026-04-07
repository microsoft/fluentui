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
    const { runInfoReport } = await import('../impl/info-report');
    return runInfoReport(argv.output);
  },
};

export default infoCommand;
