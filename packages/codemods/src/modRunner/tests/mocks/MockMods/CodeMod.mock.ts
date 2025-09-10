import { CodeMod as CodeModType, ModResult, NoOp } from '../../../../codeMods/types';
import { Err } from '../../../../helpers/result';

const CodeMod: CodeModType<string> = {
  run: () => {
    return Err<ModResult, NoOp>({ logs: [] });
  },
  version: '1.0.0',
  name: 'CodeMod',
};

export default CodeMod;
