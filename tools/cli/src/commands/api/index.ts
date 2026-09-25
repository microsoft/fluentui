import type { CommandModule } from 'yargs';

import { API_COMMAND_SPEC, applyCommandOptions } from '../../utils/command-spec';
import type { ApiArgs } from './handler';

const command: CommandModule<{}, ApiArgs> = {
  command: API_COMMAND_SPEC.command,
  describe: API_COMMAND_SPEC.description,
  builder: yargs =>
    applyCommandOptions(yargs, API_COMMAND_SPEC)
      .positional('symbol', {
        type: 'string',
        describe: 'Public export name, for example Button or ButtonProps; omit to list APIs',
      })
      .example('$0 api Button --system fluent-v9', 'Show Button props')
      .example('$0 api Button --system fluent-v9 --json --dense', 'Read compact structured API data for agents')
      .example('$0 api ButtonProps --system fluent-v9', 'Show a type without specifying its type/value binding')
      .example(
        '$0 api Button --from @fluentui/react-headless-components-preview/button',
        'Select an API by its import path',
      )
      .version(false)
      .help(),
  handler: async argv => {
    const { handler } = await import('./handler');
    return handler(argv);
  },
};

export default command;
