import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NativeSliderProps, NativeSliderState } from './NativeSlider.types';

/**
 * Create the state required to render NativeSlider.
 *
 * The returned state can be modified with hooks such as useNativeSliderStyles_unstable,
 * before being passed to renderNativeSlider_unstable.
 *
 * @param props - props from this instance of NativeSlider
 * @param ref - reference to root HTMLDivElement of NativeSlider
 */
export const useNativeSlider_unstable = (
  props: NativeSliderProps,
  ref: React.Ref<HTMLInputElement>,
): NativeSliderState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'input',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('input', {
        ref,
        type: 'range',
        ...props,
      }),
      { elementType: 'input' },
    ),
  };
};
