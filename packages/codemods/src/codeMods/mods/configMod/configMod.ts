import { SourceFile } from 'ts-morph';
import { CodeMod } from '../../types';
import { findJsxTag, renameProp } from '../../utilities/index';

const jsonObj = require('../upgrades.json');

/* Intermediate file that reads upgrades.json and returns
   a codemod object to be run.
   TODO: Add error checks for 'undefined' */
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
  const modDetails = jsonObj.upgrades;
  for (let i = 0; i < modDetails.length; i++) {
    if (modDetails[i].type === 'renameProp') {
      const func = function() {
        const tags = findJsxTag(file, modDetails[i].options.from.importName);
        renameProp(tags, modDetails[i].options.from.toRename, modDetails[i].options.to.replacementName);
      };
      functions.push(func);
    }
  }
  return functions;
}
