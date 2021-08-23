import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { CardVariables } from './cardVariables';
import type { CardPreviewStylesProps } from '../../../../components/Card/CardPreview';

export const cardPreviewStyles: ComponentSlotStylesPrepared<CardPreviewStylesProps, CardVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      margin: v.previewMargin,
      ...(p.horizontal && {
        margin: v.previewMarginHorizontal,
      }),
      ...(p.fitted && {
        margin: v.fittedPreviewMargin,
      }),
    };
  },
};
