import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { CardVariables } from './cardVariables';
import type { CardExpandableBoxStylesProps } from '../../../../components/Card/CardExpandableBox';

export const cardExpandableBoxStyles: ComponentSlotStylesPrepared<CardExpandableBoxStylesProps, CardVariables> = {
  root: (): ICSSInJSStyle => {
    return {
      display: 'flex',
    };
  },
};
