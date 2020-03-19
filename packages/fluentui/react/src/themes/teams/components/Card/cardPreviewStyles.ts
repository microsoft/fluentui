import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardPreviewStylesProps } from '../../../../components/Card/CardPreview';

const cardPreviewStyles: ComponentSlotStylesPrepared<CardPreviewStylesProps, CardVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      ...(!p.fitted && {
        marginBottom: v.cardChildMarginBottom,
        ...(p.horizontal && {
          marginBottom: undefined,
          marginRight: v.cardChildMarginBottom
        })
      })
    };
  }
};

export default cardPreviewStyles;
