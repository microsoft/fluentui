// @ts-check

require('yargs')
  .commandDir('commands')

  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
    default: false,
  })
  .help().argv;
