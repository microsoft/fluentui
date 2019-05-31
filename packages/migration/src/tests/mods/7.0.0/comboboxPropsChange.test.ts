import valueMigration from '../../../mods/7.0.0/comboboxValuePropChange';
import onChangeWarning from '../../../mods/7.0.0/comboboxOnChangedPropsChange';
import path from 'path';
import { runMigration } from '../utils';

describe('comboboxPropsChange', () => {
  it('transforms value to text', async () => {
    const result = await runMigration(valueMigration, path.join('7.0.0', 'combobox.tsx'));
    expect(result.warnings).toEqual([]);
    expect(result.contents).toMatchSnapshot();
  });

  it('warns for onChanged prop removal', async () => {
    const result = await runMigration(onChangeWarning, path.join('7.0.0', 'combobox.tsx'));
    expect(result.warnings.length).toEqual(1);
  });
});
