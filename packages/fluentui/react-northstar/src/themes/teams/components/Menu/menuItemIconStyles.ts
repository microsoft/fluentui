import { pxToRem } from '../../../../utils';
import { MenuVariables } from './menuVariables';
import { MenuItemIconStylesProps } from '../../../../components/Menu/MenuItemIcon';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

export const menuItemIconStyles: ComponentSlotStylesPrepared<MenuItemIconStylesProps, MenuVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: v.iconSize,
    height: v.iconSize,

    '& > :first-child': {
      height: '100%',
      width: '100%',
    },

    ...(p.hasContent && {
      marginRight: pxToRem(10),
    }),
    ...(!p.iconOnly && {
      // reduce margins so text has the dominant influence on the vertical height
      marginTop: 0,
      marginBottom: pxToRem(-8),
      verticalAlign: 'top',
    }),
  }),
};
