import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ItemLayoutStylesProps } from 'src/components/ItemLayout/ItemLayout';
import { ItemLayoutVariables } from './itemLayoutVariables';

export const itemLayoutStyles: ComponentSlotStylesPrepared<ItemLayoutStylesProps, ItemLayoutVariables> = {
  root: ({ variables }): ICSSInJSStyle => {
    return {
      gridTemplateRows: `minmax(${variables.height}, max-content)`,
      paddingLeft: variables.paddingLeft,
      paddingRight: variables.paddingRight,
    };
  },
};
