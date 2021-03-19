import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { PillContentStylesProps } from '../../../../components/Pill/PillContent';
import { PillVariables } from './pillVariables';

export const pillContentStyles: ComponentSlotStylesPrepared<PillContentStylesProps, PillVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    fontSize: v.contentFontSize,
    padding: `${v.contentVerticalPadding} ${v.contentHorizontalPadding}`,

    ...(p.size === 'small' && {
      fontSize: v.contentFontSizeSmall,
      padding: `${v.contentVerticalPaddingSmall} ${v.contentHorizontalPaddingSmall}`,
    }),
    ...(p.size === 'medium' && {
      fontSize: v.contentFontSizeMedium,
      padding: `${v.contentVerticalPaddingMedium} ${v.contentHorizontalPaddingMedium}`,
    }),
  }),
};
