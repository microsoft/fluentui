import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardFooterStylesProps } from '../../../../components/Card/CardFooter';

export const cardFooterStyles: ComponentSlotStylesPrepared<CardFooterStylesProps, CardVariables> = {
  root: ({ variables: v, props: p }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      margin: v.footerMargin,
      ...(p.fitted && { margin: v.fittedFooterMargin }),
    };
  },
};
