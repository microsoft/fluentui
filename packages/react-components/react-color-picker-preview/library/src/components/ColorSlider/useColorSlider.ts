import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ColorSliderProps, ColorSliderState } from './ColorSlider.types';

/**
 * Create the state required to render ColorSlider.
 *
 * The returned state can be modified with hooks such as useColorSliderStyles_unstable,
 * before being passed to renderColorSlider_unstable.
 *
 * @param props - props from this instance of ColorSlider
 * @param ref - reference to root HTMLDivElement of ColorSlider
 */
export const useColorSlider_unstable = (props: ColorSliderProps, ref: React.Ref<HTMLDivElement>): ColorSliderState => {
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
