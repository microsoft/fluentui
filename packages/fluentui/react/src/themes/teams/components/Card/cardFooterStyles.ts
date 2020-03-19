import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardFooterStylesProps } from '../../../../components/Card/CardFooter';

const cardFooterStyles: ComponentSlotStylesPrepared<CardFooterStylesProps, CardVariables> = {
  root: ({ variables: v, props: p }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      ...(!p.fitted && { marginBottom: v.cardChildMarginBottom })
    };
  }
};

export default cardFooterStyles;
