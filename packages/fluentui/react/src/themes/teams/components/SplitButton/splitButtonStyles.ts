import { ICSSInJSStyle } from '@fluentui/styles'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

const splitButtonStyles = {
  menuButton: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
    padding: v.padding,

    ...(p.size === 'small' && {
      height: v.smallDimension,
      padding: v.smallPadding,
      minWidth: v.smallMinWidth,
      boxShadow: v.smallBoxShadow,
    }),

    ':focus-visible': {
      borderRightWidth: 0,

      ':before': {
        borderRightWidth: 0,
      },

      ':after': {
        borderRightWidth: 0,
      },
    },

    ':active': {
      animationName: 'unset',
      animationDuration: 'unset',
    },
  }),

  toggleButton: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderColor: v.borderColor,
    ...getIconFillOrOutlineStyles({ outline: true }),

    ...(p.primary && {
      borderWidth: `0 0 0 ${siteVariables.borderWidth}`,
      borderColor: v.borderColorPrimary,
    }),

    ...(p.disabled && {
      borderWidth: `0 0 0 ${siteVariables.borderWidth}`,
      borderColor: v.borderColorDisabled,
    }),

    ...(p.size === 'small' && {
      height: v.smallDimension,
      width: v.smallDimension,
      minWidth: v.smallMinWidth,
      boxShadow: v.smallBoxShadow,
    }),

    ':focus-visible': {
      ':before': {
        borderLeftWidth: 0,
      },

      ':after': {
        borderLeftWidth: 0,
      },
    },

    ':active': {
      animationName: 'unset',
      animationDuration: 'unset',
    },
  }),

  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
    })

    return {
      borderRadius: v.borderRadius,
      position: 'relative',
      display: 'inline-block',

      ':focus-within': {
        boxShadow: 'none',
        ...(p.isFromKeyboard && {
          // make sure focus is coming from keyboard before applying the focus styles
          // otherwise focus state is applied only to the button and not the toggle
          ...borderFocusStyles[':focus-visible'],
        }),
      },
    }
  },
}

export default splitButtonStyles
