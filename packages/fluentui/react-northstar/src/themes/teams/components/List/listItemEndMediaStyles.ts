import { ComponentSlotStylesPrepared } from '@fluentui/styles';

import { ListItemEndMediaStylesProps } from '../../../../components/List/ListItemEndMedia';
import { ListItemVariables } from './listItemVariables';

export const listItemEndMediaStyles: ComponentSlotStylesPrepared<ListItemEndMediaStylesProps, ListItemVariables> = {
  root: ({ props: p }) => ({
    flexShrink: 0,
    ...((p.selectable || p.navigable) && { display: 'none' }),
  }),
};
