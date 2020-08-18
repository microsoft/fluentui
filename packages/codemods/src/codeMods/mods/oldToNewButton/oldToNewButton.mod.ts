import { SourceFile } from 'ts-morph';
import { CodeMod } from '../../types';
import { renameProp, findJsxTag } from '../../utilities/index';
import { Ok, Err } from '../../../helpers/result';

const oldToNewButton: CodeMod = {
  run: (file: SourceFile) => {
    try {
      const tags = findJsxTag(file, 'DefaultButton');
      renameProp(tags, 'toggled', 'checked');
    } catch (e) {
      return Err({ reason: 'Error' });
    }
    return Ok({ logs: ['Upgrade completed'] });
  },
  version: '100000',
  name: 'oldToNewButton',
  enabled: true,
};

export default oldToNewButton;
