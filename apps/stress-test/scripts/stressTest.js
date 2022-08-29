const yargs = require('yargs');

<<<<<<< HEAD
yargs.usage('Usage: $0 <cmd> [options]').commandDir('commands').demandCommand().help().parse();
=======
yargs
  .usage('Usage: $0 <cmd> [options]')
  .command(require('./commands/run.js'))
  .command(require('./commands/build.js'))
  .command(require('./commands/dev.js'))
  .command(require('./commands/buildTestConfig.js'))
  .command(require('./commands/processResults.js'))
  .command(require('./commands/runServer.js'))
  .command(require('./commands/runTachometer.js'))
  .demandCommand()
  .help()
  .parse();
>>>>>>> 76c9e7deb9 (stress-test: add cli application)
