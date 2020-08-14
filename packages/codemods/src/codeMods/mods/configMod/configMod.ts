import { SourceFile } from 'ts-morph';
import {
  CodeMod,
  UpgradeJSONType,
  ModTypes,
  RenamePropModType,
  RepathImportModType,
  CodeModMapType,
} from '../../types';
import { findJsxTag, renameProp, getImportsByPath, repathImport } from '../../utilities/index';

const jsonObj: UpgradeJSONType = require('../upgrades.json');

/* Intermediate file that reads upgrades.json and returns
   a codemod object to be run. */
export function createCodeModFromJson(): CodeMod | undefined {
  return {
    run: (file: SourceFile) => {
      try {
        /* Codemod body, which can be added to */
        const funcs = getCodeModUtilitiesFromJson(file);
        funcs.forEach(func => {
          func();
        });
      } catch (e) {
        return { success: false };
      }
      return { success: true };
    },
    version: '100000',
    name: jsonObj.name,
    enabled: true,
  };
}

/* Helper function that parses a json object for details about individual
   codemods and formats each into a function. These functions are stored in
   an array that is returned to the user. */
export function getCodeModUtilitiesFromJson(file: SourceFile): (() => void)[] {
  const functions = [];
  const modDetails: ModTypes[] = jsonObj.upgrades;
  for (let i = 0; i < modDetails.length; i++) {
    /* Try and get the codemod function associated with the mod type. */
    const func = codeModMap[modDetails[i].type](file, modDetails[i]);
    if (func) {
      functions.push(func);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw 'Error: attempted to access a codeMod mapping from an unsupported type.';
    }
  }
  return functions;
}

/* Dictionary that maps codemod names to functions that execute said mod.
   Used by getCodeModUtilitiesFromJson to easily get the desired function
   from the json object.

   TODO: How well does this scale for devs who want to add mods but don't care about json?*/
const codeModMap: CodeModMapType = {
  renameProp: function(file: SourceFile, mod: RenamePropModType) {
    return function() {
      const tags = findJsxTag(file, mod.options.from.importName);
      renameProp(tags, mod.options.from.toRename, mod.options.to.replacementName);
    };
  },
  repathImport: function(file: SourceFile, mod: RepathImportModType) {
    return function() {
      const imports = getImportsByPath(file, mod.options.from.searchString);
      imports.forEach(val => {
        repathImport(val, mod.options.to.replacementValue);
      });
    };
  },
};
