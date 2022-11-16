import { pxToRem } from '../../../../utils';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { MenuStylesProps } from '../../../../components/Menu/Menu';
import { MenuVariables } from './menuVariables';
import { getColorScheme } from '../../colors';

export const menuStyles: ComponentSlotStylesPrepared<MenuStylesProps, MenuVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { iconOnly, fluid, pointing, pills, primary, underlined, vertical, submenu } = p;
    const colors = getColorScheme(v.colorScheme, null, primary);
    const { siteVariables } = theme;

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
        padding: `${pxToRem(8)} ${pxToRem(4)}`,
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
          border: `${v.borderWidth} solid ${primary ? v.primaryBorderColor : v.borderColor || colors.border}`,
          borderRadius: siteVariables.borderRadiusMedium,
          ...(submenu && {
            borderColor: v.subMenuBorderColor,
          }),
        }),
      ...(underlined && {
        borderBottom: `${v.underlinedBottomBorderWidth} solid ${v.underlinedBorderColor}`,
      }),
    };
  },
};
