import { SourceFile } from 'ts-morph';
import { CodeMod } from '../../types';
import { renameProp, findJsxTag } from '../../utilities/index';
import { Err } from '../../../helpers/result';

const oldToNewButton: CodeMod = {
  run: (file: SourceFile) => {
    try {
      const tags = findJsxTag(file, 'DefaultButton');
      return renameProp(tags, 'toggled', 'checked').then(v => ({
        logs: ['rename completed'],
      }));
    } catch (e) {
      return Err({ error: e });
    }
  },
  version: '100000',
  name: 'oldToNewButton',
  enabled: true,
};

export default oldToNewButton;
