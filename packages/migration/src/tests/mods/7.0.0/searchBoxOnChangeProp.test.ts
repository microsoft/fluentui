import migration from '../../../mods/7.0.0/searchBoxPropsArgs';
import path from 'path';
import { runMigration } from '../utils';

describe('SearchBox onChange args', () => {
  it('alerts if onChange specified', async () => {
    const result = await runMigration(migration, path.join('7.0.0', 'searchbox.tsx'));
    expect(result.warnings.length).toEqual(2);
  });
});
