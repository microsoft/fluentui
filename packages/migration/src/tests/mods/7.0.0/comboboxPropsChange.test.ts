import migration from '../../../mods/7.0.0/comboboxPropsChange';
import path from 'path';
import { runMigration } from '../utils';

describe('comboboxPropsChange', () => {
  it('transforms onChanged to onChange, value to text', async () => {
    const result = await runMigration(migration, path.join('7.0.0', 'combobox.tsx'));
    expect(result.warnings).toEqual([]);
    expect(result.contents).toMatchSnapshot();
  });
});
