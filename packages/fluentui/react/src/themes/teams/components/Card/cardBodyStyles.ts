import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardBodyStylesProps } from '../../../../components/Card/CardBody';

const cardBodyStyles: ComponentSlotStylesPrepared<CardBodyStylesProps, CardVariables> = {
  root: ({ variables: v, props: p }): ICSSInJSStyle => {
    return {
      display: 'flex',
      flexDirection: 'column',
      ...(!p.fitted && { marginBottom: v.cardChildMarginBottom })
    };
  }
};

export default cardBodyStyles;
