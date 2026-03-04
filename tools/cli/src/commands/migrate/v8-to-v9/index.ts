import type { CommandModule } from 'yargs';

interface V8ToV9Args {
  path: string;
  dryRun: boolean;
}

const command: CommandModule<{}, V8ToV9Args> = {
  command: 'v8-to-v9',
  describe: 'Migrate Fluent UI v8 (@fluentui/react) to v9 (@fluentui/react-components)',
  builder: yargs =>
    yargs
      .option('path', {
        type: 'string',
        demandOption: true,
        describe: 'Source root to annotate (e.g. src/, app/, packages/my-app/src)',
      })
      .option('dry-run', {
        type: 'boolean',
        default: false,
        describe: 'Preview annotations without writing files',
      })
      .version(false)
      .help(),
  handler: async argv => {
    const { handler } = await import('./handler');
    return handler(argv);
  },
};

export default command;
