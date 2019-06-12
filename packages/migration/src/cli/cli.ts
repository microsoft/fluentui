interface IParsedCommand {
  writeResults: boolean;
  help: boolean;
  version: string;
}

const defaultParsedCommand = {
  writeResults: false,
  help: false,
  version: ''
};

export class CliParser {
  public parse(args: string[]): IParsedCommand {
    if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
      return { ...defaultParsedCommand, help: true };
    }
    if (args.some(a => a === '-w' || a === '--write')) {
      return {
        ...defaultParsedCommand,
        writeResults: true,
        version: args[1]
      };
    }
    return {
      ...defaultParsedCommand,
      version: args[0]
    };
  }
}

export function displayHelp() {
  const output = [
    'Usage:',
    '  migration [-w] VERSION',
    '',
    'Options:',
    '  -h --help   Display this message',
    '  -w --write  Write changes directly to files'
  ];
  console.error(output.join('\n'));
}
