import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardExpandableBoxStylesProps } from '../../../../components/Card/CardExpandableBox';

export const cardExpandableBoxStyles: ComponentSlotStylesPrepared<CardExpandableBoxStylesProps, CardVariables> = {
  root: (): ICSSInJSStyle => {
    return {
      display: 'flex',
    };
  },
};
