import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { ListItemHeaderMediaStylesProps } from '../../../../components/List/ListItemHeaderMedia';
import type { ListItemVariables } from './listItemVariables';

export const listItemHeaderMediaStyles: ComponentSlotStylesPrepared<
  ListItemHeaderMediaStylesProps,
  ListItemVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    alignSelf: 'flex-end',

    fontSize: v.headerMediaFontSize,
    lineHeight: v.headerMediaLineHeight,
  }),
};
