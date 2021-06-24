import { pxToRem } from '../../../../utils';
import { MenuVariables } from './menuVariables';
import { MenuItemIndicatorStylesProps } from '../../../../components/Menu/MenuItemIndicator';
import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { submenuIndicatorDirection } from './submenuIndicatorDirection';

export const menuItemIndicatorStyles: ComponentSlotStylesPrepared<MenuItemIndicatorStylesProps, MenuVariables> = {
  root: ({ props: p, variables: v }) => {
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

      content: '" "',
      display: 'block',
      overflow: 'hidden',
      height: pxToRem(16),
      width: pxToRem(16),
      backgroundSize: pxToRem(16),

      color: v.indicatorColor,

      ...(p.active && {
        color: v.activeIndicatorColor,

        ...(p.primary && {
          color: v.activePrimaryIndicatorColor,

          ...(p.vertical && {
            color: v.activePrimaryVerticalIndicatorColor,
          }),
        }),
      }),

      ...(p.underlined && { color: v.indicatorColor }),
      ...(p.iconOnly && { color: v.indicatorColor }),

      ...submenuIndicatorDirection(p.vertical),
    };
  },
};
