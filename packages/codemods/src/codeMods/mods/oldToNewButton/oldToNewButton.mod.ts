import { SourceFile } from 'ts-morph';
import { CodeMod } from '../../types';
import { renameProp, findJsxTag } from '../../utilities/index';
import { Ok, Err } from '../../../helpers/result';

const oldToNewButton: CodeMod = {
  run: (file: SourceFile) => {
    try {
      const tags = findJsxTag(file, 'DefaultButton');
      const res = renameProp(tags, 'toggled', 'checked');
      if (res.ok) {
        return Ok({ logs: ['Renaming completed.'] });
      } else {
        return Err({ reason: `Unable to complete renaming: ${res.value}` });
      }
    } catch (e) {
      return Err({ reason: e });
    }
  },
  version: '100000',
  name: 'oldToNewButton',
  enabled: true,
};

export default oldToNewButton;
