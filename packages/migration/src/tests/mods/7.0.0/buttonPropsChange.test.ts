import textMigration from '../../../mods/7.0.0/buttonTextPropChange';
import iconPropsMigration from '../../../mods/7.0.0/buttonIconPropsPropChange';
import buttonMenuPropsMigration from '../../../mods/7.0.0/buttonMenuPropsPropChange';
import buttonToMenuButtonMigration from '../../../mods/7.0.0/buttonToMenuButtonNodeChange';
import buttonToSplitButtonMigration from '../../../mods/7.0.0/buttonToSplitButtonNodeChange';
import splitButtonSplitPropRemovalMigration from '../../../mods/7.0.0/splitButtonSplitPropRemovalChange';
import { runMigration } from '../utils';

describe('buttonPropsChange', () => {
  it('transforms deprecated props to the corresponding non-deprecated ones', async () => {
    const result = await runMigration(
      [
        textMigration,
        iconPropsMigration,
        buttonMenuPropsMigration,
        buttonToSplitButtonMigration,
        buttonToMenuButtonMigration,
        splitButtonSplitPropRemovalMigration
      ],
      'button.tsx'
    );
    expect(result.warnings).toEqual([]);
    expect(result.contents).toMatchSnapshot();
  });
});
