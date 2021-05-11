import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardBodyStylesProps } from '../../../../components/Card/CardBody';

export const cardBodyStyles: ComponentSlotStylesPrepared<CardBodyStylesProps, CardVariables> = {
  root: ({ variables: v, props: p }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      margin: v.bodyMargin,
      ...(p.fitted && { margin: v.fittedBodyMargin }),
    };
  },
};
