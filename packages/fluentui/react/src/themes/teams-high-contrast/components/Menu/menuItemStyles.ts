import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { MenuVariables } from '../../../teams/components/Menu/menuVariables';
import { default as MenuItem, MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem';
import { underlinedItem } from '../../../teams/components/Menu/menuItemStyles';
import submenuIndicatorUrl from '../../../teams/components/Menu/submenuIndicatorUrl';

type MenuItemPropsAndState = MenuItemProps & MenuItemState;

const menuItemStyles: ComponentSlotStylesPrepared<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { iconOnly, isFromKeyboard, vertical, active, underlined, primary, pointing, disabled } = p;

    return {
      [`&>.${MenuItem.className}>.${MenuItem.slotClassNames.indicator}`]: {
        backgroundImage: submenuIndicatorUrl(v.colorActive, p.vertical)
      },

      ':hover': {
        color: v.colorActive,
        ...(!active && {
          ...(primary && !underlined && { color: v.colorActive }),
          background: v.backgroundColorFocus
        })
      },

      ...(active && {
        color: v.colorActive,

        ...(underlined && { color: v.color }),
        ...(!underlined && { background: v.backgroundColorActive })
      }),

      ...((iconOnly || vertical) && {
        ...(isFromKeyboard && {
          color: v.colorActive,
          background: v.backgroundColorFocus
        }),

        ':hover': {
          color: v.colorActive,
          background: v.backgroundColorFocus
        }
      }),

      ...(underlined && {
        ':hover': {
          color: v.color
        },
        ...(isFromKeyboard && {
          color: v.colorActive
        })
      }),

      ...(pointing &&
        vertical && {
          '::before': {
            display: 'none'
          }
        }),

      ...(disabled && {
        ':hover': {
          // reset all existing hover styles
        }
      })
    };
  },

  root: ({ props, variables: v }): ICSSInJSStyle => {
    const { iconOnly, isFromKeyboard, underlined, primary, active } = props;

    return {
      ...(underlined && {
        ...(active && {
          color: v.color,
          ...(!primary && underlinedItem(v.color))
        }),
        ':hover': {
          color: v.color
        },
        ...(isFromKeyboard && {
          color: v.colorActive
        })
      }),
      // focus styles
      ...(isFromKeyboard &&
        iconOnly && {
          borderColor: 'transparent'
        })
    };
  }
};

export default menuItemStyles;
