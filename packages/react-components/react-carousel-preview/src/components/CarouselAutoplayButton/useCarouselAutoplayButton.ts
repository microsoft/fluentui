import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { CarouselAutoplayButtonProps, CarouselAutoplayButtonState } from './CarouselAutoplayButton.types';

/**
 * Create the state required to render CarouselAutoplayButton.
 *
 * The returned state can be modified with hooks such as useCarouselAutoplayButtonStyles_unstable,
 * before being passed to renderCarouselAutoplayButton_unstable.
 *
 * @param props - props from this instance of CarouselAutoplayButton
 * @param ref - reference to root HTMLDivElement of CarouselAutoplayButton
 */
export const useCarouselAutoplayButton_unstable = (
  props: CarouselAutoplayButtonProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselAutoplayButtonState => {
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
