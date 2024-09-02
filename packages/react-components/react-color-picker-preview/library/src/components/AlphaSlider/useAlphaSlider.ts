import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { AlphaSliderProps, AlphaSliderState } from './AlphaSlider.types';

/**
 * Create the state required to render AlphaSlider.
 *
 * The returned state can be modified with hooks such as useAlphaSliderStyles_unstable,
 * before being passed to renderAlphaSlider_unstable.
 *
 * @param props - props from this instance of AlphaSlider
 * @param ref - reference to root HTMLDivElement of AlphaSlider
 */
export const useAlphaSlider_unstable = (props: AlphaSliderProps, ref: React.Ref<HTMLDivElement>): AlphaSliderState => {
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
