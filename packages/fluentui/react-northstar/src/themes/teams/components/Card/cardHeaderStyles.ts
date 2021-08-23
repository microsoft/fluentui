import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { CardVariables } from './cardVariables';
import type { CardHeaderStylesProps } from '../../../../components/Card/CardHeader';

export const cardHeaderStyles: ComponentSlotStylesPrepared<CardHeaderStylesProps, CardVariables> = {
  root: ({ variables: v, props: p }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      margin: v.headerMargin,
      ...(p.fitted && { margin: v.fittedHeaderMargin }),
    };
  },
};
