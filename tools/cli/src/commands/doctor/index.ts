import type { CommandModule } from 'yargs';

import { DOCTOR_COMMAND_SPEC, applyCommandOptions } from '../../utils/command-spec';
import type { DoctorArgs } from './handler';

const command: CommandModule<{}, DoctorArgs> = {
  command: DOCTOR_COMMAND_SPEC.command,
  describe: DOCTOR_COMMAND_SPEC.description,
  builder: yargs => applyCommandOptions(yargs, DOCTOR_COMMAND_SPEC).version(false).help(),
  handler: async argv => {
    const { handler } = await import('./handler');
    return handler(argv);
  },
};

export default command;
