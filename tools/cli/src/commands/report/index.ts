import type { CommandModule } from 'yargs';

const command: CommandModule = {
  command: 'report',
  describe: 'Generate reports',
  builder: yargs => yargs.version(false).help(),
  handler: async argv => {
    const { handler } = await import('./handler');
    return handler(argv);
  },
};

export default command;
