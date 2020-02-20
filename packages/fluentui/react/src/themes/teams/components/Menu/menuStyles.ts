import { pxToRem } from '../../../../utils'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { MenuProps, MenuState } from '../../../../components/Menu/Menu'
import { MenuVariables } from './menuVariables'
import {
  verticalPillsBottomMargin,
  horizontalPillsRightMargin,
  verticalPointingBottomMargin,
} from './menuItemStyles'
import { getColorScheme } from '../../colors'

type MenuPropsAndState = MenuProps & MenuState

export default {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { iconOnly, fluid, pointing, pills, primary, underlined, vertical, submenu } = p
    const colors = getColorScheme(v.colorScheme, null, primary)

    return {
      display: 'flex',
      minHeight: pxToRem(24),
      margin: 0,
      padding: 0,
      color: v.color,
      backgroundColor: v.backgroundColor || 'inherit',
      listStyleType: 'none',
      ...(iconOnly && { alignItems: 'center' }),
      ...(vertical && {
        flexDirection: 'column',
        backgroundColor: v.verticalBackgroundColor,
        padding: `${pxToRem(8)} 0`,
        ...(submenu && {
          boxShadow: v.verticalBoxShadow,
        }),
        ...(!fluid && !submenu && { width: 'fit-content' }),
        ...(iconOnly && {
          display: 'inline-block',
          width: 'auto',
        }),
      }),
      ...(!pills &&
        !iconOnly &&
        !(pointing && vertical) &&
        !underlined && {
          // primary has hardcoded grey border color
          border: `${v.borderWidth} solid ${
            primary ? v.primaryBorderColor : v.borderColor || colors.border
          }`,
          borderRadius: pxToRem(4),
        }),
      ...(underlined && {
        borderBottom: `${v.underlinedBottomBorderWidth} solid ${v.underlinedBorderColor}`,
      }),
    }
  },
  divider: ({ props: { pointing, vertical, pills } }) => ({
    ...(pointing &&
      vertical && {
        marginBottom: verticalPointingBottomMargin,
      }),
    ...(pills && {
      ...(vertical
        ? { margin: `0 0 ${verticalPillsBottomMargin} 0` }
        : { margin: `0 ${horizontalPillsRightMargin} 0 0` }),
    }),
  }),
} as ComponentSlotStylesPrepared<MenuPropsAndState, MenuVariables>
