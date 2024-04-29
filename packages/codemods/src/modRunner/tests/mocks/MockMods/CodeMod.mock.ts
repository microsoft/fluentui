import { CodeMod, ModResult, NoOp } from '../../../../codeMods/types';
import { Err } from '../../../../helpers/result';
const CodeMod: CodeMod<string> = {
  run: () => {
    return Err<ModResult, NoOp>({ logs: [] });
  },
  version: '1.0.0',
  name: 'CodeMod',
};

export default CodeMod;
