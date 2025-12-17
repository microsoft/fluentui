import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { RangeSliderProps, RangeSliderState } from './RangeSlider.types';

/**
 * Create the state required to render RangeSlider.
 *
 * The returned state can be modified with hooks such as useRangeSliderStyles_unstable,
 * before being passed to renderRangeSlider_unstable.
 *
 * @param props - props from this instance of RangeSlider
 * @param ref - reference to root HTMLDivElement of RangeSlider
 */
export const useRangeSlider_unstable = (props: RangeSliderProps, ref: React.Ref<HTMLDivElement>): RangeSliderState => {
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
