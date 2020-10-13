import { CodeMod } from '../../../../codeMods/types';
import { Err } from '../../../../helpers/result';
const CodeMod: CodeMod<string> = {
  run: () => {
    return Err({ reason: 0, logs: [] });
  },
  version: '1.0.0',
  name: 'CodeMod',
};

export default CodeMod;
