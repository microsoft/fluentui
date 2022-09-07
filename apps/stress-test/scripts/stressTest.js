const yargs = require('yargs');

yargs.usage('Usage: $0 <cmd> [options]').commandDir('commands').demandCommand().help().parse();
