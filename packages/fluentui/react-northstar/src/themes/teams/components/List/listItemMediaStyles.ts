import { pxToRem } from '../../../../utils';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { ListItemMediaStylesProps } from '../../../../components/List/ListItemMedia';
import type { ListItemVariables } from './listItemVariables';

export const listItemMediaStyles: ComponentSlotStylesPrepared<ListItemMediaStylesProps, ListItemVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...(p.important && {
      '::before': {
        content: '""',
        position: 'absolute',
        left: pxToRem(8),
        width: pxToRem(2),
        height: pxToRem(2),
        background: '#000',
      },
    }),
    ...((p.hasHeader || p.hasContent) && {
      marginRight: v.gap,
    }),
  }),
};
