import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { PillContentStylesProps } from '../../../../components/Pill/PillContent';
import type { PillVariables } from './pillVariables';

export const pillContentStyles: ComponentSlotStylesPrepared<PillContentStylesProps, PillVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    fontSize: v.contentFontSize,
    padding: v.contentPadding,
    alignSelf: 'center',
    ...(p.size === 'small' && {
      fontSize: v.contentFontSizeSmall,
      padding: v.contentPaddingSmall,
    }),
    ...(p.size === 'smaller' && {
      fontSize: v.contentFontSizeSmaller,
      padding: v.contentPaddingSmaller,
    }),
    ...(p.actionable && {
      paddingRight: 0,
    }),
  }),
};
