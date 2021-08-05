import { SourceFile } from 'ts-morph';
import { CodeMod, ModResult, ModError } from '../../types';
import { renameProp, findJsxTag } from '../../utilities/index';
import { Err } from '../../../helpers/result';

const oldToNewButton: CodeMod = {
  run: (file: SourceFile) => {
    try {
      const tags = findJsxTag(file, 'DefaultButton');
      return renameProp(tags, 'toggled', 'checked').then(_ => ({
        logs: ['rename completed'],
      }));
    } catch (e) {
      return Err<ModResult, ModError>({ error: e });
    }
  },
  version: '100000',
  name: 'oldToNewButton',
  enabled: false, // No longer needed; remains for demo purposes
};

export default oldToNewButton;
