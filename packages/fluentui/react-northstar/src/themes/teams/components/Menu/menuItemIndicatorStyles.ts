import { pxToRem } from '../../../../utils';
import { MenuVariables } from './menuVariables';
import { MenuItemIndicatorStylesProps } from '../../../../components/Menu/MenuItemIndicator';
import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { submenuIndicatorUrl } from './submenuIndicatorUrl';

export const menuItemIndicatorStyles: ComponentSlotStylesPrepared<MenuItemIndicatorStylesProps, MenuVariables> = {
  root: ({ props: p, variables: v, rtl }) => {
    return {
      position: 'relative',
      float: 'right',
      left: pxToRem(12),
      userSelect: 'none',
      marginRight: pxToRem(4),

      ...(p.inSubmenu && {
        position: 'absolute',
        top: pxToRem(6),
        right: pxToRem(2),
        left: 'unset',
      }),

      ...(rtl && {
        transform: `scaleX(-1)`,
      }),
      content: '" "',
      display: 'block',
      overflow: 'hidden',
      height: pxToRem(16),
      width: pxToRem(16),
      backgroundSize: pxToRem(16),

      backgroundImage: submenuIndicatorUrl(v.indicatorColor, p.vertical),

      ...(p.active && {
        backgroundImage: submenuIndicatorUrl(v.activeIndicatorColor, p.vertical),

        ...(p.primary && {
          backgroundImage: submenuIndicatorUrl(v.activePrimaryIndicatorColor, p.vertical),

          ...(p.vertical && {
            backgroundImage: submenuIndicatorUrl(v.activePrimaryVerticalIndicatorColor, p.vertical),
          }),
        }),
      }),

      ...(p.underlined && { backgroundImage: submenuIndicatorUrl(v.indicatorColor, p.vertical) }),
      ...(p.iconOnly && { backgroundImage: submenuIndicatorUrl(v.indicatorColor, p.vertical) }),
    };
  },
};
