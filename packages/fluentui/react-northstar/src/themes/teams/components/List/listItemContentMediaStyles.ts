import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ListItemContentMediaStylesProps } from '../../../../components/List/ListItemContentMedia';
import { ListItemVariables } from './listItemVariables';

export const listItemContentMediaStyles: ComponentSlotStylesPrepared<
  ListItemContentMediaStylesProps,
  ListItemVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    fontSize: v.contentMediaFontSize,
    lineHeight: v.contentMediaLineHeight,
  }),
};
