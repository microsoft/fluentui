import migration from '../../../mods/7.0.0/warnAutobindRemoved';
import path from 'path';
import { runMigration } from '../utils';

describe('warnAutobindRemoved', () => {
  it('warns when autobind is used', async () => {
    const result = await runMigration(migration, path.join('7.0.0', 'autobind.tsx'));
    expect(result.warnings).toEqual([
      '_root/7.0.0/autobind.tsx:2:0 - autobind decorator (@autobind) no longer available; consider using lambdas instead.'
    ]);
  });
});
