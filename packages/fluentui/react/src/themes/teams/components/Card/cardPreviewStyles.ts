import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TeamsCardVariables } from './cardVariables';
import { CardPreviewStylesProps } from '../../../../components/Card/CardPreview';

const cardPreviewStyles: ComponentSlotStylesPrepared<CardPreviewStylesProps, TeamsCardVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    return {
      ...(!p.noMarginAfter && {
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
