import { SourceFile } from 'ts-morph';
import { CodeMod } from '../../types';
import { renameImport, renameProp, findJsxTag } from '../../utilities';

//const buttonPath = 'office-ui-fabric-react/lib/Button';

const oldToNewButton: CodeMod = {
  run: (file: SourceFile) => {
    try {
      const tags = findJsxTag(file, 'Button');
      renameProp(tags, 'toggled', 'checked');
    } catch (e) {
      return { success: false };
    }
    return { success: true };
  },
  version: '100000',
  name: 'oldToNewButton',
  enabled: true,
};

export default oldToNewButton;
