import { SourceFile } from 'ts-morph';
import {
  CodeMod,
  UpgradeJSONType,
  ModTypes,
  RenamePropModType,
  RepathImportModType,
  CodeModMapType,
  ModOptions,
  RenameImportType,
} from '../../types';
import { findJsxTag, renameProp, getImportsByPath, repathImport, renameImport } from '../../utilities/index';
import { Ok, Err } from '../../../helpers/result';

const jsonObj: UpgradeJSONType = require('../upgrades.json');

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
  const mods = [];
  const modDetails: ModTypes[] = jsonObj.upgrades;
  for (let i = 0; i < modDetails.length; i++) {
    /* Try and get the codemod function associated with the mod type. */
    const func = codeModMap[modDetails[i].type](modDetails[i]);
    if (func) {
      const options: ModOptions = {
        name: modDetails[i].name,
        version: modDetails[i].version ? modDetails[i].version! : '100000',
      };
      mods.push(createCodeMod(options, func));
    } else {
      // eslint-disable-next-line no-throw-literal
      throw 'Error: attempted to access a codeMod mapping from an unsupported type.';
    }
  }
  return mods;
}

/* Helper function that creates a codeMod given a name and a list of functions that compose the mod. */
export function createCodeMod(options: ModOptions, mod: (file: SourceFile) => void): CodeMod {
  return {
    run: (file: SourceFile) => {
      try {
        /* Codemod body. */
        mod(file);
      } catch (e) {
        return Err({ reason: `Mod failed: ${e}` });
      }
      return Ok({ logs: ['Upgrade completed'] });
    },
    version: options.version,
    name: options.name,
    enabled: true,
  };
}

/* Dictionary that maps codemod names to functions that execute said mod.
   Used by getCodeModUtilitiesFromJson to easily get the desired function
   from the json object. */
const codeModMap: CodeModMapType = {
  renameProp: function(mod: RenamePropModType) {
    return function(file: SourceFile) {
      const tags = findJsxTag(file, mod.options.from.importName);
      renameProp(tags, mod.options.from.toRename, mod.options.to.replacementName);
    };
  },
  repathImport: function(mod: RepathImportModType) {
    return function(file: SourceFile) {
      /* If the json indicates our search string is a regex, convert it. */
      const searchString = mod.options.from.isRegex
        ? new RegExp(
            (mod.options.from.searchString as string)
              .substring(1)
              .substring(0, (mod.options.from.searchString as string).length - 2),
          )
        : mod.options.from.searchString;
      return getImportsByPath(file, searchString).then(v =>
        v.map(imp => repathImport(imp, mod.options.to.replacementValue)),
      );
    };
  },
  renameImport: function(mod: RenameImportType) {
    return function(file: SourceFile) {
      renameImport(file, mod.options.from.originalImport, mod.options.to.renamedImport);
    };
  },
};
