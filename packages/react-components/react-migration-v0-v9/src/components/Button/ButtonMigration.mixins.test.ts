import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import * as buttonMigrationStyles from './ButtonMigration.mixins';

describe('ButtonMigration.mixins', () => {
  describe('classNames check', () => {
    test('v9: iconRegularClassName', () => {
      expect(iconRegularClassName).toEqual('fui-Icon-regular');
    });
    test('v9: iconFilledClassName', () => {
      expect(iconFilledClassName).toEqual('fui-Icon-filled');
    });
  });
  describe('v0Icon', () => {
    expect(buttonMigrationStyles.v0Icon()).toMatchInlineSnapshot(`
      Object {
        "& .ui-icon__filled": Object {
          "display": "none",
        },
        "& .ui-icon__outline": Object {
          "display": "block",
        },
        "&:hover": Object {
          "& .ui-icon__filled": Object {
            "display": "block",
          },
          "& .ui-icon__outline": Object {
            "display": "none",
          },
        },
      }
    `);
  });

  describe('v9Icon', () => {
    expect(buttonMigrationStyles.v9Icon()).toMatchSnapshot();
  });

  describe('v9CustomSizeIcon', () => {
    expect(buttonMigrationStyles.v9CustomSizeIcon()).toMatchSnapshot();
  });

  describe('v9DisabledCursor', () => {
    expect(buttonMigrationStyles.v9DisabledCursor()).toMatchSnapshot();
  });
});
