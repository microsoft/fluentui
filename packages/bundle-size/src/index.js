const yargs = require('yargs');

const cliSetup = yargs
  .commandDir('commands', { exclude: /.test\.js$/ })
  .option('quiet', {
    alias: 'q',
    type: 'boolean',
    description: 'Suppress verbose build output',
    default: false,
  })
  .scriptName('bundle-size')
  .version(false).argv;

module.exports = cliSetup;
