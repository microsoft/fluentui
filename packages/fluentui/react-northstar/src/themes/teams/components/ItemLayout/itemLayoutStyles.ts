import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { ItemLayoutStylesProps } from '../../../../components/ItemLayout/ItemLayout';
import type { ItemLayoutVariables } from './itemLayoutVariables';

export const itemLayoutStyles: ComponentSlotStylesPrepared<ItemLayoutStylesProps, ItemLayoutVariables> = {
  root: ({ variables }): ICSSInJSStyle => {
    return {
      gridTemplateRows: `minmax(${variables.height}, max-content)`,
      paddingLeft: variables.paddingLeft,
      paddingRight: variables.paddingRight,
    };
  },
};
