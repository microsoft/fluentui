import yarr from 'yargs';
import { Maybe } from './helpers/maybe';
import { CodeMod, ModRunnerConfigType, ModError } from './codeMods/types';
import { getModFilter, getModExcludeFilter } from './modRunner/modFilter';
import { Glob } from 'glob';
import { Result, Err, Ok } from './helpers/result';
import { getEnabledMods, getModsPaths } from './modRunner/runnerUtilities';

export interface CommandParserResult<T = CodeMod> {
  shouldExit?: boolean;
  modsFilter: (mod: T) => boolean;
  saveSync?: boolean;
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
      description: 'a list of strings of mod names to exclude',
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
    .option('list', {
      alias: 'l',
      type: 'boolean',
      default: false,
      description: 'lists the provided enabled codemods.',
    })
    .option('saveSync', {
      alias: 's',
      type: 'boolean',
      default: false,
      description:
        'saves all of the changes syncronously file by file rather than saving the project as a whole.' +
        ' Helps prevent memory from running out if your project is very large.' +
        ' Increases the time it takes to complete upgrade',
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
    if (parsed.list) {
      const mods = getEnabledMods(console, getModsPaths);
      // eslint-disable-next-line no-console
      console.log('Here are the enabled code mod names:\n');
      mods.forEach(mod => {
        // eslint-disable-next-line no-console
        console.log(mod.name);
      });
      return { shouldExit: true, modsFilter: () => true };
    }
    let configObj: ModRunnerConfigType = { stringFilters: [], regexFilters: [], includeMods: false };
    if (parsed.config) {
      /* Attempt to locate the modConfig file in the user's repo. */
      const configResult = getModRunnerConfig();
      if (configResult.ok) {
        configObj = configResult.value;
      } else {
        // eslint-disable-next-line no-console
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
      saveSync: parsed.saveSync,
    };
  }
}

function getModRunnerConfig(): Result<ModRunnerConfigType, ModError> {
  const foundJsonFile = new Glob('/**/modConfig.json', {
    absolute: false,
    root: process.cwd(),
    ignore: ['**/node_modules/**'],
    sync: true,
  });
  let configObj: ModRunnerConfigType = { stringFilters: [], regexFilters: [], includeMods: false };
  // eslint-disable-next-line no-console
  console.log('Configuration detected. Attempting to run mods from config...');
  if (!foundJsonFile.found || foundJsonFile.found.length !== 1) {
    return Err<ModRunnerConfigType, ModError>({ error: new Error('Error, could not locate correct config file.') });
  } else {
    configObj = require(foundJsonFile.found[0]);
    return Ok(configObj);
  }
}
