import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { ListItemContentMediaStylesProps } from '../../../../components/List/ListItemContentMedia';
import type { ListItemVariables } from './listItemVariables';

export const listItemContentMediaStyles: ComponentSlotStylesPrepared<
  ListItemContentMediaStylesProps,
  ListItemVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    fontSize: v.contentMediaFontSize,
    lineHeight: v.contentMediaLineHeight,
  }),
};
