import yarr from 'yargs';
import { Maybe } from './helpers/maybe';
import { CodeMod } from './codeMods/types';
import { getModFilter, getModExcludeFilter } from './modRunner/modFilter';
export interface CommandParserResult<T = CodeMod> {
  shouldExit?: boolean;
  modsFilter: (mod: T) => boolean;
}
export interface Commands {
  help?: boolean;
  filter?: string;
}

export const yargsParse = (passedArgs: string[]) => {
  return yarr([])
    .help()
    .exitProcess(false)
    .option('modNames', {
      alias: 'n',
      type: 'string',
      array: true,
      description: 'A list of strings of mod names to run',
    })
    .option('modPatterns', {
      alias: 'r',
      type: 'string',
      array: true,
      description: 'A list of strings of mod names to exclude',
    })
    .option('excludeMods', {
      alias: 'e',
      type: 'boolean',
      default: false,
      description:
        'switches the filters from being inclusive, to exclusive.' +
        'If no filters provided, will exclude all mods by default',
    })
    .parse(passedArgs);
};

export class CommandParser {
  public parseArgs(passedIn: string[]): CommandParserResult {
    const parsed = yargsParse(passedIn);
    if (parsed.help) {
      return { shouldExit: true, modsFilter: () => true };
    }
    const filts = {
      stringFilter: Maybe(parsed.modNames),
      regexFilter: Maybe(parsed.modPatterns),
    };

    const filter = parsed.excludeMods ? getModExcludeFilter(filts) : getModFilter(filts);

    return {
      shouldExit: false,
      modsFilter: filter,
    };
  }
}
