/* eslint-disable @typescript-eslint/naming-convention */
import { GriffelStyle, shorthands } from '@fluentui/react-components';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { buttonMigrationStyles } from './ButtonMigration.mixins';

const testMixin = (mixin: GriffelStyle | undefined, expectedStyle: GriffelStyle | undefined) => {
  const name = expectedStyle ? JSON.stringify(expectedStyle) : 'empty';
  test(name, () => {
    const result = { ...mixin };
    expect(result).toEqual(expectedStyle || {});
  });
};

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
    const styles = {
      '& .ui-icon__outline': {
        display: 'block',
      },
      '& .ui-icon__filled': {
        display: 'none',
      },
      '&:hover': {
        '& .ui-icon__outline': {
          display: 'none',
        },
        '& .ui-icon__filled': {
          display: 'block',
        },
      },
    };
    testMixin(buttonMigrationStyles.v0Icon(), styles);
  });

  describe('v9Icon', () => {
    const styles = {
      '& svg': {
        width: '100%',
        paddingBottom: '100%',
        ...shorthands.margin('-4px', 0, 0, '-4px'),
        ...shorthands.overflow('visible'),
      },
      '& .fui-Icon-filled': {
        display: 'none',
      },
      '& .fui-Icon-regular': {
        display: 'inline',
      },
      '&:hover': {
        '& .fui-Icon-filled': {
          display: 'inline',
        },
        '& .fui-Icon-regular': {
          display: 'none',
        },
      },
    };
    testMixin(buttonMigrationStyles.v9Icon(), styles);
  });

  describe('v9CustomSizeIcon', () => {
    const styles = {
      '& svg': {
        ...shorthands.overflow('visible'),
      },
      '& .fui-Icon-filled': {
        display: 'none',
      },
      '& .fui-Icon-regular': {
        display: 'inline',
      },
      '&:hover': {
        '& .fui-Icon-filled': {
          display: 'inline',
        },
        '& .fui-Icon-regular': {
          display: 'none',
        },
      },
    };
    testMixin(buttonMigrationStyles.v9CustomSizeIcon(), styles);
  });

  describe('v9DisabledCursor', () => {
    const styles = {
      '&:disabled': {
        cursor: 'default',
        '&:hover': {
          cursor: 'default',
        },
        '&:hover:active': {
          cursor: 'default',
        },
      },
    };
    testMixin(buttonMigrationStyles.v9DisabledCursor(), styles);
  });
});
