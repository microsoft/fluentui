import type { CommandModule } from 'yargs';

import type { UsageArgs } from '../impl/types';
import { REPORT_USAGE_COMMAND_SPEC, applyCommandOptions } from '../../../utils/command-spec';

const usageCommand: CommandModule<{}, UsageArgs> = {
  command: REPORT_USAGE_COMMAND_SPEC.command,
  describe: REPORT_USAGE_COMMAND_SPEC.description,
  builder: yargs => applyCommandOptions(yargs, REPORT_USAGE_COMMAND_SPEC).version(false).help(),
  handler: async argv => {
    const { runUsageReport } = await import('../impl/usage-report');
    return runUsageReport(argv.path, argv.reporter, argv.include, argv.exclude, argv.output, {
      config: argv.config,
      system: argv.system,
      package: argv.package,
      metadataMode: argv.metadataMode,
    });
  },
};

export default usageCommand;
