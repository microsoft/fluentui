import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { FlexItemStylesProps } from '../../../../components/Flex/FlexItem';

import { toFlexAlignment, toFlexItemSizeValues } from './utils';
import { FlexItemVariables } from './flexItemVariables';

export const flexItemStyles: ComponentSlotStylesPrepared<FlexItemStylesProps, FlexItemVariables> = {
  root: ({ props: p, variables: v }) => {
    return {
      ...(p.align && { alignSelf: toFlexAlignment(p.align) }),

      ...(p.size && toFlexItemSizeValues(v.hasOwnProperty(p.size) ? v[p.size] : p.size)),

      ...(typeof p.shrink === 'number' && { flexShrink: p.shrink }),
      ...(p.shrink === false && { flexShrink: 0 }),

      ...(p.grow && { flexGrow: p.grow }),
      ...(p.grow === true && { flexGrow: 1 }),

      ...(p.push && (p.flexDirection === 'column' ? { marginTop: 'auto' } : { marginLeft: 'auto' })),
    };
  },
};
