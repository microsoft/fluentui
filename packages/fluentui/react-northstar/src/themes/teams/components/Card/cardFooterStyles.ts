import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { CardVariables } from './cardVariables';
import type { CardFooterStylesProps } from '../../../../components/Card/CardFooter';

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
