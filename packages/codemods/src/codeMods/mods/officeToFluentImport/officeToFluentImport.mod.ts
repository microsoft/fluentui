import { SourceFile } from 'ts-morph';
import { CodeMod, Reasons, CodeModResult } from '../../types';
import { getImportsByPath, repathImport } from '../../utilities/index';
import { Ok, Err } from '../../../helpers/result';

const searchString = /^office\-ui\-fabric\-react/;
const newString = '@fluentui/react';

const combineResults = (result: CodeModResult, result2: CodeModResult) => {
  return result.chain(v =>
    result2.biChain(
      r => {
        return Ok({ logs: v.logs.concat(...r.logs) });
      },
      e => {
        if (e.reason === Reasons.ERROR) {
          return Err(e);
        }
        return Ok({ logs: v.logs.concat(...e.logs) });
      },
    ),
  );
};

const RepathOfficeToFluentImports: CodeMod = {
  run: (file: SourceFile) => {
    return getImportsByPath(file, searchString)
      .then(imports =>
        imports.map(val =>
          repathImport(val, newString, searchString).then(i => ({
            logs: [i.getModuleSpecifierValue()],
          })),
        ),
      )
      .chain(v => {
        if (v.length > 0) {
          return v.reduce(combineResults);
        } else {
          return Err({ reason: Reasons.NO_OP, logs: ['Nothing to rename found'] });
        }
      });
  },
  name: 'RepathOfficeImportsToFluent',
  version: '1.0.0',
  enabled: false,
};
export default RepathOfficeToFluentImports;
