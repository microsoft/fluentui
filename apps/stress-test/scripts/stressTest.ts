import yargs from 'yargs';
import build from './commands/build.js';
import buildTestConfig from './commands/buildTestConfig.js';
import dev from './commands/dev.js';
import processResults from './commands/processResults.js';
import run from './commands/run.js';
import runServer from './commands/runServer.js';
import runTachometer from './commands/runTachometer.js';
import buildFixture from './commands/buildFixture.js';

yargs
  .usage('Usage: $0 <cmd> [options]')
  .command(build)
  .command(buildTestConfig)
  .command(dev)
  .command(processResults)
  .command(run)
  .command(runServer)
  .command(runTachometer)
  .command(buildFixture)
  .demandCommand()
  .help()
  .parse();
