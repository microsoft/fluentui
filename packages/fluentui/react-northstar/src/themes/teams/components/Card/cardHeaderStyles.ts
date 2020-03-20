import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardHeaderStylesProps } from '../../../../components/Card/CardHeader';

const cardHeaderStyles: ComponentSlotStylesPrepared<CardHeaderStylesProps, CardVariables> = {
  root: ({ variables: v, props: p }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      margin: v.headerMargin,
      ...(p.fitted && { margin: v.fittedHeaderMargin }),
    };
  },
};

export default cardHeaderStyles;
