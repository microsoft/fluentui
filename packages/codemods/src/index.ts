import { CommandParser } from './command';
import { upgrade } from './upgrade';

const command = new CommandParser().parseArgs(process.argv);
if (command.shouldExit) {
  process.exit(1);
}

upgrade(command);
