import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ListItemHeaderStylesProps } from '../../../../components/List/ListItemHeader';
import { ListItemVariables } from './listItemVariables';

export const listItemHeaderStyles: ComponentSlotStylesPrepared<ListItemHeaderStylesProps, ListItemVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    flexGrow: 1,
    fontSize: v.headerFontSize,
    lineHeight: v.headerLineHeight,

    ...(p.truncate && {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    ...((!p.hasContent || p.hasHeaderMedia) && {
      marginRight: v.gap,
    }),
  }),
};
