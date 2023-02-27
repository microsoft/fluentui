import { SourceFile } from 'ts-morph';
import {
  CodeMod,
  RenamePropModType,
  RepathImportModType,
  CodeModMapType,
  ModOptions,
  RenameImportType,
  CodeModResult,
  ModResult,
  ModError,
  NoOp,
} from '../../types';
import { findJsxTag, renameProp, getImportsByPath, repathImport, renameImport } from '../../utilities/index';
import { Ok, Err } from '../../../helpers/result';
import { MaybeDictionary, isSomething } from '../../../helpers/maybe';

import jsonObj from '../upgrades.json';

/* Creates and returns an array of CodeMod objects from a JSON file. Optionally takes in
   an array of functions from user to turn into codemods as well. */
export function createCodeModsFromJson(userMods?: CodeMod[]): CodeMod[] | undefined {
  const funcs = getCodeModsFromJson();
  /* If the user wants to supply any codemods (as a void function that takes in a sourcefile),
     add those offerings right now! */
  if (userMods) {
    funcs.concat(userMods);
  }
  return funcs;
}

/* Helper function that parses a json object for details about individual
   codemods and formats each into a function. These functions are stored in
   an array that is returned to the user. */
export function getCodeModsFromJson(): CodeMod[] {
  return jsonObj.upgrades
    .map(modDetail =>
      codeModMap[modDetail.type]
        .then(v => v(modDetail))
        .then(v => {
          const options: ModOptions = {
            name: modDetail.name,
            version: modDetail.version ? modDetail.version! : '100000',
          };
          return createCodeMod(options, v);
        }),
    )
    .filter(isSomething)
    .map(v => v.value);
}

/* Helper function that creates a codeMod given a name and a list of functions that compose the mod. */
export function createCodeMod(options: ModOptions, mod: (file: SourceFile) => CodeModResult): CodeMod {
  return {
    run: (file: SourceFile) => {
      try {
        /* Codemod body. */
        return mod(file);
      } catch (e) {
        return Err<ModResult, ModError>({ error: e });
      }
    },
    version: options.version,
    name: options.name,
    enabled: true,
  };
}

/* Dictionary that maps codemod names to functions that execute said mod.
   Used by getCodeModUtilitiesFromJson to easily get the desired function
   from the json object. */
const _codeModMap: CodeModMapType = {
  renameProp: (mod: RenamePropModType) => {
    return (file: SourceFile) => {
      const tags = findJsxTag(file, mod.options.from.importName);
      const res = renameProp(tags, mod.options.from.toRename, mod.options.to.replacementName);
      if (res.ok) {
        return Ok({ logs: [res.value] });
      } else {
        return Err<ModResult, NoOp>({
          logs: [`unable to rename the prop ${mod.options.from.toRename} in all files.`],
        });
      }
    };
  },
  repathImport: (mod: RepathImportModType) => {
    return (file: SourceFile): CodeModResult => {
      /* If the json indicates our search string is a regex, convert it. */
      const searchString = mod.options.from.isRegex
        ? new RegExp(
            (mod.options.from.searchString as string)
              .substring(1)
              .substring(0, (mod.options.from.searchString as string).length - 2),
          )
        : mod.options.from.searchString;
      return getImportsByPath(file, searchString)
        .then(v => v.map(imp => repathImport(imp, mod.options.to.replacementValue)))
        .chain(_ => Ok({ logs: ['Successfully repathed imports'] }));
    };
  },
  renameImport: (mod: RenameImportType) => {
    return (file: SourceFile) => {
      return renameImport(file, mod.options.from.originalImport, mod.options.to.renamedImport);
    };
  },
};

const combineResults = (result: CodeModResult, result2: CodeModResult) => {
  return result.chain(v =>
    result2.bothChain(
      r => {
        return Ok({ logs: v.logs.concat(...r.logs) });
      },
      e => {
        if ('error' in e) {
          return Err<ModResult, ModError>(e);
        }
        return Ok({ logs: v.logs.concat(...e.logs) });
      },
    ),
  );
};

const codeModMap = MaybeDictionary(_codeModMap);

let __configs: CodeMod[] | undefined = undefined;
/* ConfigMod is also an exportable code mod. All it does is wrap all of
   the codemods from the json file into a single code mod, so that devs
   can very easily run mods from json with a (npx fluent... -n "configMod"). */
const configMod: CodeMod = {
  run: (file: SourceFile) => {
    if (!__configs) {
      __configs = getCodeModsFromJson();
      if (__configs === undefined) {
        return Err<ModResult, ModError>({
          error: 'Failed to get any mods from json. Perhaps the file is missing or malformed?',
        });
      }
    }

    const results: CodeModResult[] = [];
    for (let i = 0; i < __configs.length; i++) {
      const mod = __configs[i];
      results.push(mod.run(file));
    }
    if (results.length === 0) {
      return Ok({ logs: ['No runnable mods were found in the config'] });
    }

    return results.reduce(combineResults);
  },
  name: 'configMod',
  version: '1.0.0',
  enabled: true,
};

export default configMod;
