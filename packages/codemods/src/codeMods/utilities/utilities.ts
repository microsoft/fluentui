import { SourceFile } from 'ts-morph';
import { findJsxTag, findJsxTagInFile } from './jsx';
import { renameImport, repathImport, getImportsByPath } from './imports';

function applyCodeMods(files: SourceFile[], mod: (file: SourceFile) => void) {
  files.forEach(mod);
  void 0;
}

export const utilities = {
  findJsxTag,
  findJsxTagInFile,
  renameImport,
  repathImport,
  applyCodeMods,
  getImportsByPath,
};
