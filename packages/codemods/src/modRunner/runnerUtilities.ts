import { CodeMod, CodeModResult, ModResult, ModError } from '../codeMods/types';
import { Glob } from 'glob';
import { Maybe, Nothing, Something } from '../helpers/maybe';
import { Err, Result, Ok, partitionResults } from '../helpers/result';
import { Logger } from './logger';

interface RunResult {
  modName: string;
  logs: (string | undefined)[];
}
interface ErrorResult {
  modName: string;
  error: Error | string;
}

export function runMods<T>(
  codeMods: CodeMod<T>[],
  sources: T[],
  onFileComplete: (result: { file: T; resultList: [RunResult[], ErrorResult[]] }) => void,
  loggingCallback?: (result: { mod: CodeMod<T>; file: T; result: CodeModResult }) => void,
) {
  for (const file of sources) {
    const results: Result<RunResult, ErrorResult>[] = [];
    for (let i = 0; i < codeMods.length; i++) {
      const mod = codeMods[i];
      const result = runMod(mod, file, loggingCallback).bothChain<RunResult, ErrorResult>(
        v => Ok({ logs: v.logs, modName: mod.name }),
        err => {
          if ('error' in err) {
            return Err<RunResult, ErrorResult>({ modName: mod.name, error: err.error });
          }

          return Ok({ logs: ['Mod was a NoOp on this file'], modName: mod.name });
        },
      );
      results.push(result);
    }

    onFileComplete({ file, resultList: partitionResults(results) });
  }
}

function runMod<T>(
  codeMod: CodeMod<T>,
  file: T,
  loggingCallback?: (result: { mod: CodeMod<T>; file: T; result: CodeModResult }) => void,
): CodeModResult {
  let result: CodeModResult;
  try {
    result = codeMod.run(file);
  } catch (e) {
    result = Err<ModResult, ModError>({ error: e });
  }

  if (loggingCallback) {
    loggingCallback({ mod: codeMod, file: file, result: result });
  }
  return result;
}

export function getModsRootPath() {
  // This function always needs to be in a folder that is a sibling
  // of codeMods.
  return `${__dirname}/../codeMods/mods`;
}

export function getModsPattern(includeTs: boolean = false) {
  // For testing
  if (includeTs) {
    return '/**/*.@(js|ts)';
  }

  return '/**/*.mod.js';
}

export function getModsPaths(root: string = getModsRootPath(), modsPath: string = getModsPattern()) {
  const glob = new Glob(modsPath, {
    absolute: false,
    root: root,
    sync: true,
  });
  return glob.found;
}

// Note, this root will be wherever the npx command is run from.
// For now it will need to be run at the root of the project/monorepo

export function getTsConfigs(root: string = process.cwd()) {
  const glob = new Glob('/**/tsconfig.json', {
    absolute: false,
    ignore: ['**/node_modules/**'],
    root: root,
    sync: true,
  });

  return glob.found;
}

export function loadMod(path: string, errorCallback: (e: Error) => void): Maybe<CodeMod> {
  try {
    const mod = require(path).default;
    return Maybe<CodeMod>(mod);
  } catch (e) {
    errorCallback(e);
  }

  return Nothing();
}

export function getEnabledMods(logger: Logger, getPaths = getModsPaths, loadM = loadMod) {
  return getPaths()
    .map(pth => {
      logger.log('fetching codeMod at ', pth);
      return loadM(pth, e => {
        logger.error(e);
      });
    })
    .filter(modEnabled)
    .map(v => v.value);
}

export function modEnabled<T>(mod: Maybe<CodeMod<T>>): mod is Something<CodeMod<T>> {
  return mod.then(v => !!v.enabled).orElse(false);
}
