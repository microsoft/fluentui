import { SourceFile } from 'ts-morph';
import { CodeMod } from '../../types';
import { getImportsByPath, repathImport } from '../../utilities/index';
import { Ok } from '../../../helpers/result';

const searchString = /^office\-ui\-fabric\-react/;
const newString = '@fluentui/react';

const RepathOfficeToFluentImports: CodeMod = {
  run: (file: SourceFile) => {
    return getImportsByPath(file, searchString)
      .then(imports => imports.map(val => repathImport(val, newString, searchString)))
      .then(v =>
        v.map(r =>
          r.resolve(
            i => i.getModuleSpecifierValue(),
            e => e.reason,
          ),
        ),
      )
      .chain(v => Ok({ logs: v }));
  },
  name: 'RepathOfficeImportsToFluent',
  version: '1.0.0',
  enabled: false,
};
export default RepathOfficeToFluentImports;
