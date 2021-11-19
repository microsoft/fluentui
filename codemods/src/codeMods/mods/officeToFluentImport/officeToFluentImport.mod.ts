import { SourceFile } from 'ts-morph';
import { CodeMod, CodeModResult, NoOp, ModError, ModResult } from '../../types';
import { getImportsByPath, repathImport } from '../../utilities/index';
import { Ok, Err } from '../../../helpers/result';

// Packages which only need uifabric to be replaced
// [ /azure-themes/, "" ],
// [ /example\-data/, "" ],
// [ /jest\-serializer-merge-styles/, "" ],
// [ /merge\-styles/, "" ],
// [ /monaco\-editor/, "" ],
// [ /react\-cards/, "" ],
// [ /react\-hooks/, "" ],
// [ /set\-version/, "" ],
// [ /test\-utilities/, "" ],
// [ /theme\-samples/, "" ],
// [ /utilities/, "" ],

const uiFabricMap: [RegExp, string][] = [
  // Search for both uifabric and fluentui so that order doesn't matter
  [/^(@uifabric|@fluentui)\/charting/, '@fluentui/react-charting'],
  [/^(@uifabric|@fluentui)\/date\-time/, '@fluentui/react-date-time'],
  [/^(@uifabric|@fluentui)\/example\-app\-base/, '@fluentui/react-docsite-components'],
  [/^(@uifabric|@fluentui)\/experiments/, '@fluentui/react-experiments'],
  [/^(@uifabric|@fluentui)\/file\-type\-icons/, '@fluentui/react-file-type-icons'],
  [/^(@uifabric|@fluentui)\/foundation/, '@fluentui/foundation-legacy'],
  [/^(@uifabric|@fluentui)\/icons/, '@fluentui/font-icons-mdl2'],
  [/^(@uifabric|@fluentui)\/styling/, '@fluentui/style-utilities'],
  [/^(@uifabric|@fluentui)\/tsx\-editor/, '@fluentui/react-monaco-editor'],
  [/^(@uifabric|@fluentui)\/variants/, '@fluentui/scheme-utilities'],
  [/^(@uifabric|@fluentui)\/webpack\-utils/, '@fluentui/webpack-utilities'],
  [/^office\-ui\-fabric\-react/, '@fluentui/react'],
  [/^@uifabric/, '@fluentui'],
];

const combineResults: (result: CodeModResult, result2: CodeModResult) => CodeModResult = (result, result2) => {
  return result.chain(v =>
    result2.bothChain(
      r => {
        return Ok({ logs: v.logs.concat(...r.logs) });
      },
      e => {
        if ('error' in e) {
          return Err<ModResult, NoOp | ModError>(e);
        }
        return Ok({ logs: v.logs.concat(...e.logs) });
      },
    ),
  );
};

const getRepather: (search: RegExp, newValue: string) => (file: SourceFile) => CodeModResult = (search, newValue) => {
  return (file: SourceFile) => {
    return getImportsByPath(file, search)
      .then(imports =>
        imports.map(val =>
          repathImport(val, newValue, search).then(i => ({
            logs: [i.getModuleSpecifierValue()],
          })),
        ),
      )
      .chain(v => {
        if (v.length > 0) {
          return v.reduce(combineResults);
        } else {
          return Err<ModResult, NoOp>({ logs: ['Nothing to rename found'] });
        }
      });
  };
};

const allRepathers = uiFabricMap.map(mp => getRepather(...mp));

const RepathOfficeToFluentImports: CodeMod = {
  run: (file: SourceFile) => {
    return allRepathers.map(v => v(file)).reduce(combineResults);
  },
  name: 'RepathOfficeImportsToFluent',
  version: '1.0.0',
  enabled: true,
};

export default RepathOfficeToFluentImports;
