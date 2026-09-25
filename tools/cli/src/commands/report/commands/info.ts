import type { CommandModule } from 'yargs';

import type { InfoArgs } from '../impl/types';
import { REPORT_INFO_COMMAND_SPEC, applyCommandOptions } from '../../../utils/command-spec';

const infoCommand: CommandModule<{}, InfoArgs> = {
  command: REPORT_INFO_COMMAND_SPEC.command,
  describe: REPORT_INFO_COMMAND_SPEC.description,
  builder: yargs => applyCommandOptions(yargs, REPORT_INFO_COMMAND_SPEC).version(false).help(),
  handler: async argv => {
    const { runInfoReport } = await import('../impl/info-report');
    return runInfoReport(argv.output, {
      config: argv.config,
      system: argv.system,
      package: argv.package,
      metadataMode: argv.metadataMode,
    });
  },
};

export default infoCommand;
