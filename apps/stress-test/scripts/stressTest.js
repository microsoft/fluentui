const yargs = require('yargs');

yargs
  .usage('Usage: $0 <cmd> [options]')
  .command(require('./commands/run.js'))
  .command(require('./commands/buildTestConfig'))
  .command(require('./commands/processResults.js'))
  .command(require('./commands/runServer.js'))
  .command(require('./commands/runTachometer.js'))
  .demandCommand()
  .help()
  .parse();
