import { ICodeMod } from '../codeMods/ICodeMod';
import { Glob } from 'glob';
import { Range } from 'semver';

// TODO ensure that async for all these utilities works
export function runMods<T>(
  codeMods: ICodeMod<T>[],
  sources: T[],
  loggingCallback: (result: { mod: ICodeMod<T>; file: T; error?: Error }) => void,
) {
  for (const file of sources) {
    // Run every mod on each file?
    // I like that
    for (const mod of codeMods) {
      try {
        mod.run(file);
        loggingCallback({ mod, file });
      } catch (e) {
        loggingCallback({ mod, file, error: e });
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

// TODO this is a great place for maybe, this pattern will probably be a bunch of places.
export function loadMod(path: string, errorCallback: (e: Error) => void): { success: boolean; mod?: ICodeMod } {
  try {
    const mod = require(path).default;
    if (mod) {
      return { success: true, mod };
    }
  } catch (e) {
    errorCallback(e);
  }

  return { success: false };
}

// tslint:disable-next-line: no-any
export function filterMods(codeMods: ICodeMod<any>[], semvarRange: Range) {
  return codeMods.filter(mod => shouldRunMod(mod, semvarRange));
}

// Defaults to allowing almost any version to run.
// tslint:disable-next-line: no-any
export function shouldRunMod(mod: ICodeMod<any>, semvarRange: Range = new Range('>0 <1000')) {
  return mod.enabled && semvarRange.test(mod.version);
}
