export class CommandParserResult {
  // path: string = ""; TODO this doesn't work with jest; why?
  constructor(public shouldExit = false, public path = '') {}
}

export class CommandParser {
  constructor(private logger = console.log) {}

  public parseArgs(argv: string[]) {
    if (argv.slice(2).indexOf('--help') >= 0) {
      this.logger(['Usage:', [argv[0], argv[1], '<path in project>'].join(' ')].join('\n'));

      return new CommandParserResult(true);
    }

    return new CommandParserResult(false, argv[2]);
  }
}
