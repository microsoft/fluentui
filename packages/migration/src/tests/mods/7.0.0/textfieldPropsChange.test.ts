import renamePropsMigration from '../../../mods/7.0.0/textFieldRenameProps';
import onChangeWarning from '../../../mods/7.0.0/textFieldWarnRemovedProps';
import path from 'path';
import { runMigration } from '../utils';

describe('textfieldPropsChange', () => {
  it('transforms value to text', async () => {
    const result = await runMigration(renamePropsMigration, path.join('7.0.0', 'textfield.tsx'));
    expect(result.warnings).toEqual([]);
    expect(result.contents).toMatchSnapshot();
  });

  it('warns for props removal', async () => {
    const result = await runMigration(onChangeWarning, path.join('7.0.0', 'textfield.tsx'));
    expect(result.warnings.length).toEqual(3);
  });
});
