import { SourceFile } from 'ts-morph';
import { CodeMod, CodeModResult } from '../../types';
import { getImportsByPath, repathImport } from '../../utilities/index';
import { Ok, Err } from '../../../helpers/result';

const uiFabricRename = /^(@uifabric|@fluentui)\//;

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
  [/charting/, 'react-charting'],
  [/date\-time/, 'react-date-time'],
  [/example\-app\-base/, 'react-docsite-components'],
  [/experiments/, 'react-experiments'],
  [/file\-type\-icons/, 'react-file-type-icons'],
  [/foundation/, 'foundation-legacy'],
  [/icons/, 'font-icons-mdl2'],
  [/styling/, 'style-utilities'],
  [/tsx\-editor/, 'react-monaco-editor'],
  [/variants/, 'scheme-utilities'],
  [/webpack\-utils/, 'webpack-utilities'],
].map(v => [new RegExp(uiFabricRename.source + (v[0] as RegExp).source), ('@fluentui/' + v[1]) as string]);
uiFabricMap.push([/^@uifabric/, '@fluentui']);

const officeuimap = [/^office\-ui\-fabric\-react/, '@fluentui/react'];

const combineResults = (result: CodeModResult, result2: CodeModResult) => {
  return result.chain(v =>
    result2.bothChain(
      r => {
        return Ok({ logs: v.logs.concat(...r.logs) });
      },
      e => {
        if ('error' in e) {
          return Err(e);
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
          return Err({ logs: ['Nothing to rename found'] });
        }
      });
  };
};

const allRepathers = uiFabricMap.map(mp => getRepather.apply(null, mp)).concat([getRepather.apply(null, officeuimap)]);

const RepathOfficeToFluentImports: CodeMod = {
  run: (file: SourceFile) => {
    return allRepathers.map(v => v(file)).reduce(combineResults);
  },
  name: 'RepathOfficeImportsToFluent',
  version: '1.0.0',
  enabled: true,
};

export default RepathOfficeToFluentImports;
