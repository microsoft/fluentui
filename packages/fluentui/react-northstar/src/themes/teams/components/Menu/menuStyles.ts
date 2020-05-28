import { pxToRem } from '../../../../utils';
import { ComponentSlotStylesPrepared, ICSSInJSStyle, margin, padding } from '@fluentui/styles';
import { MenuStylesProps } from '../../../../components/Menu/Menu';
import { MenuVariables } from './menuVariables';
import { getColorScheme } from '../../colors';

const menuStyles: ComponentSlotStylesPrepared<MenuStylesProps, MenuVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { iconOnly, fluid, pointing, pills, primary, underlined, vertical, submenu } = p;
    const colors = getColorScheme(v.colorScheme, null, primary);

    return {
      display: 'flex',
      minHeight: pxToRem(24),
      ...margin('0'),
      ...padding('0'),
      color: v.color,
      backgroundColor: v.backgroundColor || 'inherit',
      listStyleType: 'none',
      ...(iconOnly && { alignItems: 'center' }),
      ...(vertical && {
        flexDirection: 'column',
        backgroundColor: v.verticalBackgroundColor,
        paddingLeft: pxToRem(8),
        paddingRight: pxToRem(8),
        paddingTop: 0,
        paddingBottom: 0,

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
          borderRadius: pxToRem(4),
        }),
      ...(underlined && {
        borderBottom: `${v.underlinedBottomBorderWidth} solid ${v.underlinedBorderColor}`,
      }),
    };
  },
};

export default menuStyles;
