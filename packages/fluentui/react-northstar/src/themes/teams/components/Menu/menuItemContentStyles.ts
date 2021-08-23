import { pxToRem } from '../../../../utils';
import type { MenuVariables } from './menuVariables';
import type { MenuItemContentStylesProps } from '../../../../components/Menu/MenuItemContent';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

export const menuItemContentStyles: ComponentSlotStylesPrepared<MenuItemContentStylesProps, MenuVariables> = {
  root: ({ props: p }): ICSSInJSStyle => {
    const widthAdjust = (p.hasIcon ? 26 : 0) + (p.hasMenu ? 16 : 0);
    return {
      whiteSpace: 'normal',
      lineHeight: 1.5,
      marginTop: pxToRem(-4),
      marginBottom: pxToRem(-4),
      display: 'inline-block',
      userSelect: 'none',
      ...((p.inSubmenu || p.vertical) && {
        width: 'max-content',
        minWidth: pxToRem(46 - widthAdjust),
        maxWidth: pxToRem(262 - widthAdjust),
        marginRight: pxToRem(16),
      }),
    };
  },
};
