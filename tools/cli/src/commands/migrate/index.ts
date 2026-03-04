import type { CommandModule } from 'yargs';

const command: CommandModule = {
  command: 'migrate',
  describe: 'Run codemod migrations',
  builder: yargs => yargs.version(false).help(),
  handler: async argv => {
    const { handler } = await import('./handler');
    return handler(argv);
  },
};

export default command;
