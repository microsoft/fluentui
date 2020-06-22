import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardExpandableBoxStylesProps } from '../../../../components/Card/CardExpandableBox';

const cardExpandableBoxStyles: ComponentSlotStylesPrepared<CardExpandableBoxStylesProps, CardVariables> = {
  root: (): ICSSInJSStyle => {
    return {
      display: 'flex',
    };
  },
};

export default cardExpandableBoxStyles;
