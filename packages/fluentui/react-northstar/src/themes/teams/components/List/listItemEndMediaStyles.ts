import type { ComponentSlotStylesPrepared } from '@fluentui/styles';
import type { ListItemEndMediaStylesProps } from '../../../../components/List/ListItemEndMedia';
import type { ListItemVariables } from './listItemVariables';

export const listItemEndMediaStyles: ComponentSlotStylesPrepared<ListItemEndMediaStylesProps, ListItemVariables> = {
  root: ({ props: p }) => ({
    flexShrink: 0,
    ...((p.selectable || p.navigable) && { display: 'none' }),
  }),
};
