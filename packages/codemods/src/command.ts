import yarr from 'yargs';
import { Maybe, Nothing } from './maybe';
export interface CommandParserResult {
  shouldExit?: boolean;
  stringFilter: Maybe<string[]>;
  regexFilter: Maybe<string[]>;
}
export interface Commands {
  help?: boolean;
  filter?: string;
}

export class CommandParser {
  public parseArgs(passedIn: string[]): CommandParserResult {
    const parsed = yarr([])
      .help()
      .exitProcess(false)
      .option('sfilter', {
        alias: 'sf',
        type: 'string',
        array: true,
        description: 'pass a list of strings to filter by mod name. Does substring search',
      })
      .option('rfilter', {
        alias: 'rf',
        array: true,
        type: 'string',
        description: 'pass a list of regex to filter by mod name',
      })
      .parse(passedIn);
    if (parsed.help) {
      return { shouldExit: true, regexFilter: Nothing(), stringFilter: Nothing() };
    }

    return {
      shouldExit: false,
      stringFilter: Maybe<string[]>(parsed.sfilter),
      regexFilter: Maybe<string[]>(parsed.rfilter),
    };
  }
}
