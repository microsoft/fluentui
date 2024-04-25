import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { CarouselButtonProps, CarouselButtonState } from './CarouselButton.types';

/**
 * Create the state required to render CarouselButton.
 *
 * The returned state can be modified with hooks such as useCarouselButtonStyles_unstable,
 * before being passed to renderCarouselButton_unstable.
 *
 * @param props - props from this instance of CarouselButton
 * @param ref - reference to root HTMLDivElement of CarouselButton
 */
export const useCarouselButton_unstable = (
  props: CarouselButtonProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselButtonState => {
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
