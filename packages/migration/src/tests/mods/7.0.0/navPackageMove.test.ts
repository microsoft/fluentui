import migration from '../../../mods/7.0.0/navToLegacy';
import path from 'path';
import { runMigration } from '../utils';

describe('Nav package move', () => {
  it('moves import statements', async () => {
    const result = await runMigration(migration, path.join('7.0.0', 'nav.tsx'));
    expect(result.warnings).toEqual([]);
    expect(result.contents).toMatchSnapshot();
  });
});
