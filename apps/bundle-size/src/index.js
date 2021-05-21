require('yargs')
  .commandDir('commands')

  .option('quiet', {
    alias: 'v',
    type: 'boolean',
    description: 'Suppress verbose build output',
    default: false,
  })
  .version(false).argv;
