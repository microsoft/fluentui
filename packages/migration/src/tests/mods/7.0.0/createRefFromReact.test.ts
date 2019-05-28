import migration from '../../../mods/7.0.0/createRefFromReact';
import path from 'path';
import { runMigration } from '../utils';

describe('createRefFromReact', () => {
  it('transforms createRef', async () => {
    const transformedFile = await runMigration(migration, path.join('7.0.0', 'createRef.tsx'));
    expect(transformedFile).toMatchSnapshot();
  });
});
