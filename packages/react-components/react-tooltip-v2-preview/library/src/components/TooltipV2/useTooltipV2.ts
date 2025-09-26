import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TooltipV2Props, TooltipV2State } from './TooltipV2.types';

/**
 * Create the state required to render TooltipV2.
 *
 * The returned state can be modified with hooks such as useTooltipV2Styles_unstable,
 * before being passed to renderTooltipV2_unstable.
 *
 * @param props - props from this instance of TooltipV2
 * @param ref - reference to root HTMLDivElement of TooltipV2
 */
export const useTooltipV2_unstable = (props: TooltipV2Props, ref: React.Ref<HTMLDivElement>): TooltipV2State => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
