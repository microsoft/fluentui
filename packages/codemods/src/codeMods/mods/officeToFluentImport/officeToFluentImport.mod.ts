import { SourceFile } from 'ts-morph';
import { CodeMod } from '../../types';
import { getImportsByPath, repathImport } from '../../utilities/index';

const searchString = /^office\-ui\-fabric\-react/;
const newString = '@fluentui/react';

const RepathOfficeToFluentImports: CodeMod = {
  run: (file: SourceFile) => {
    const imports = getImportsByPath(file, searchString);
    imports.forEach(val => {
      repathImport(val, newString, searchString);
    });
    return { success: true };
  },
  name: 'RepathOfficeImportsToFluent',
  version: '1.0.0',
  enabled: false,
};
export default RepathOfficeToFluentImports;
