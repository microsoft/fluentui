import { CodeMod, CodeModResult } from '../codeMods/types';
import { Glob } from 'glob';
import { Maybe, Nothing, Something } from '../helpers/maybe';
import { Err } from '../helpers/result';
import { Logger } from './logger';

export function runMods<T>(
  codeMods: CodeMod<T>[],
  sources: T[],
  loggingCallback: (result: { mod: CodeMod<T>; file: T; result: CodeModResult }) => void,
) {
  for (const file of sources) {
    for (const mod of codeMods) {
      try {
        loggingCallback({ mod, file, result: mod.run(file) });
      } catch (e) {
        loggingCallback({ mod, file, result: Err({ reason: e }) });
      }
    }
  }
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
