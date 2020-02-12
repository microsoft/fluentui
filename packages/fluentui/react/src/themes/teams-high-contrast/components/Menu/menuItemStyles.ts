import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { MenuVariables } from '../../../teams/components/Menu/menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'
import { underlinedItem } from '../../../teams/components/Menu/menuItemStyles'

type MenuItemPropsAndState = MenuItemProps & MenuItemState

const menuItemStyles: ComponentSlotStylesPrepared<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props: p, variables: v }): ICSSInJSStyle => {
    const {
      iconOnly,
      isFromKeyboard,
      vertical,
      active,
      underlined,
      primary,
      pointing,
      disabled,
    } = p

    return {
      ':hover': {
        color: v.colorActive,
        ...(!active && {
          ...(primary && !underlined && { color: v.colorActive }),
          background: v.backgroundColorFocus,
        }),
      },

      ...(active &&
        !underlined && {
          background: v.backgroundColorActive,
          color: v.colorActive,
        }),

      ...((iconOnly || vertical) && {
        ...(isFromKeyboard && {
          color: v.colorActive,
          background: v.backgroundColorFocus,
        }),

        ...(active && {
          color: v.colorActive,
          background: v.backgroundColorActive,
        }),

        ':hover': {
          color: v.colorActive,
          background: v.backgroundColorFocus,
        },
      }),

      ...(underlined && {
        ...(active && {
          color: v.color,
        }),
        ':hover': {
          color: v.color,
        },
        ...(isFromKeyboard && {
          color: v.colorActive,
        }),
      }),

      ...(pointing &&
        vertical && {
          '::before': {
            display: 'none',
          },
        }),

      ...(disabled && {
        cursor: 'default',
        ':hover': {
          // reset all existing hover styles
        },
      }),
    }
  },

  root: ({ props, variables: v }): ICSSInJSStyle => {
    const { iconOnly, isFromKeyboard, underlined, primary, active } = props

    return {
      ...(underlined && {
        ...(active && {
          color: v.color,
          ...(!primary && underlinedItem(v.color)),
        }),
        ':hover': {
          color: v.color,
        },
        ...(isFromKeyboard && {
          color: v.colorActive,
        }),
      }),
      // focus styles
      ...(isFromKeyboard &&
        iconOnly && {
          borderColor: 'transparent',
        }),
    }
  },
}

export default menuItemStyles
