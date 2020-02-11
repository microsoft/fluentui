import { ICSSInJSStyle } from '@fluentui/styles'
import { getColorScheme } from '../../colors'
import { pxToRem } from '../../../../utils'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const toolbarMenuItemStyles = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme)
    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
      borderRadius: 0,
    })

    return {
      position: 'relative',
      color: v.menuItemForeground || colors.foreground1,
      borderWidth: v.menuBorderWidth,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: '100%',
      padding: v.menuItemPadding,
      cursor: 'pointer',

      ':focus': {
        outline: 0,
      },

      ':hover': {
        color: v.menuItemForegroundHover || colors.menuItemForegroundHover,
        backgroundColor: v.menuItemBackgroundHover || colors.menuItemBackgroundHover,
      },

      ':focus-visible': borderFocusStyles[':focus-visible'],

      ...(p.disabled && {
        cursor: 'default',
        color: v.menuItemForegroundDisabled || colors.foregroundDisabled1,
        backgroundColor: v.menuItemBackgroundDisabled,
        ':hover': {
          // empty to overwrite all existing hover styles
        },
      }),
    }
  },

  activeIndicator: ({ variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    right: pxToRem(7),
    top: pxToRem(7),
  }),

  submenuIndicator: ({ variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    right: pxToRem(7),
    top: pxToRem(7),
  }),

  wrapper: () => ({
    display: 'block',
  }),
}

export default toolbarMenuItemStyles
