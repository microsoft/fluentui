import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { CardVariables } from './cardVariables';
import type { CardBodyStylesProps } from '../../../../components/Card/CardBody';

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
