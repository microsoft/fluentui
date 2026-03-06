import type { CommandModule } from 'yargs';

import type { InfoArgs } from '../impl/types';

const infoCommand: CommandModule<{}, InfoArgs> = {
  command: 'info',
  describe: 'Quick package & environment summary for issue reporting',
  builder: yargs => yargs.version(false).help(),
  handler: async () => {
    const { runShortReport } = await import('../impl/short-report');
    return runShortReport();
  },
};

export default infoCommand;
