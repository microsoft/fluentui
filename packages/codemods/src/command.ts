import yarr from 'yargs';
import { Maybe } from './helpers/maybe';
import { CodeMod, ModRunnerConfigType, NoOp } from './codeMods/types';
import { getModFilter, getModExcludeFilter } from './modRunner/modFilter';
import { Glob } from 'glob';
import { Result, Err, Ok } from './helpers/result';

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
    .option('config', {
      alias: 'c',
      type: 'boolean',
      default: false,
      description: 'switches modrunner to get args from the config file modConfig.json. False by default.',
    })
    .parse(passedArgs);
};
/* Class responsible for parsing the npx command that runs codemods on a repo.
   Can either take info from the command line or from a config file. */
export class CommandParser {
  public parseArgs(passedIn: string[]): CommandParserResult {
    const parsed = yargsParse(passedIn);
    if (parsed.help) {
      return { shouldExit: true, modsFilter: () => true };
    }
    let configObj: ModRunnerConfigType = { stringFilters: [], regexFilters: [], includeMods: false };
    if (parsed.config) {
      /* Attempt to locate the modConfig file in the user's repo. */
      const configResult = runConfig();
      if (configResult.ok) {
        configObj = configResult.value;
      } else {
        console.log(configResult.value);
        return { shouldExit: true, modsFilter: () => true };
      }
    }

    const filts = {
      stringFilter: parsed.config ? Maybe(configObj.stringFilters) : Maybe(parsed.modNames),
      regexFilter: parsed.config ? Maybe(configObj.regexFilters) : Maybe(parsed.modPatterns),
    };

    const shouldExclude: boolean = parsed.config ? !configObj.includeMods : parsed.excludeMods;
    const filter = shouldExclude ? getModExcludeFilter(filts) : getModFilter(filts);

    return {
      shouldExit: false,
      modsFilter: filter,
    };
  }
}

function runConfig(): Result<ModRunnerConfigType, NoOp> {
  const foundJsonFile = getModRunnerConfig();
  let configObj: ModRunnerConfigType = { stringFilters: [], regexFilters: [], includeMods: false };
  console.log('Configuration detected. Attempting to run mods from config...');
  if (!foundJsonFile || foundJsonFile.length !== 1) {
    return Err({ reason: 'Error, could not locate correct config file.' });
  } else {
    configObj = require(foundJsonFile[0]);
    return Ok(configObj);
  }
}

function getModRunnerConfig(): string[] {
  const foundJsonFile = new Glob('/**/modConfig.json', {
    absolute: false,
    root: process.cwd(),
    ignore: ['**/node_modules/**'],
    sync: true,
  });
  return foundJsonFile.found;
}
