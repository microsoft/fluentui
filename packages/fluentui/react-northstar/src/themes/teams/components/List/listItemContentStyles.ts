import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { pxToRem } from '../../../../utils';
import { ListItemContentStylesProps } from '../../../../components/List/ListItemContent';
import { ListItemVariables } from './listItemVariables';

export const listItemContentStyles: ComponentSlotStylesPrepared<ListItemContentStylesProps, ListItemVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    flexGrow: 1,
    fontSize: v.contentFontSize,
    lineHeight: v.contentLineHeight,

    ...(p.truncate && {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    ...((!p.hasHeader || p.hasContentMedia) && {
      marginRight: pxToRem(8),
    }),
  }),
};
