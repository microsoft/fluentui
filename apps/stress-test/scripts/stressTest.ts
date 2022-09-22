import * as yargs from 'yargs';
import build from './commands/build';
import buildTestConfig from './commands/buildTestConfig';
import dev from './commands/dev';
import processResults from './commands/processResults';
import run from './commands/run';
import runServer from './commands/runServer';
import runTachometer from './commands/runTachometer';

yargs
  .usage('Usage: $0 <cmd> [options]')
  .command(build)
  .command(buildTestConfig)
  .command(dev)
  .command(processResults)
  .command(run)
  .command(runServer)
  .command(runTachometer)
  .demandCommand()
  .help()
  .parse();
