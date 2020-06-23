import { SourceFile } from 'ts-morph';
import { ICodeMod } from '../ICodeMod';
import { utilities } from '../utilities/utilities';

const searchString = /^office\-ui\-fabric\-react/;
const newString = '@fluentui/react';

const RepathOfficeToFluentImports: ICodeMod = {
  run: (file: SourceFile) => {
    let imports = utilities.getImportsByPath(file, searchString);
    imports.forEach(val => {
      utilities.repathImport(val, newString, searchString);
    });
    return { success: true };
  },
  name: 'RepathOfficeImportsToFluent',
  version: '1.0.0',
  enabled: true,
};
export default RepathOfficeToFluentImports;
