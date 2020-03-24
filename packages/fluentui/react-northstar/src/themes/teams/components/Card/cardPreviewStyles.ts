import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardPreviewStylesProps } from '../../../../components/Card/CardPreview';

const cardPreviewStyles: ComponentSlotStylesPrepared<CardPreviewStylesProps, CardVariables> = {
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

export default cardPreviewStyles;
