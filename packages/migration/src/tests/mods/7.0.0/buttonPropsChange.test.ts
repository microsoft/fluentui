import textMigration from '../../../mods/7.0.0/buttonTextPropChange';
import iconPropsMigration from '../../../mods/7.0.0/buttonIconPropsPropChange';
import { runMigration } from '../utils';

describe('buttonPropsChange', () => {
  it('transforms deprecated props to the corresponding non-deprecated ones', async () => {
    const result = await runMigration([iconPropsMigration, textMigration], 'button.tsx');
    expect(result.warnings).toEqual([]);
    expect(result.contents).toMatchSnapshot();
  });
});
