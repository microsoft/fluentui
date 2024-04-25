import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { CarouselNavImageButtonProps, CarouselNavImageButtonState } from './CarouselNavImageButton.types';

/**
 * Create the state required to render CarouselNavImageButton.
 *
 * The returned state can be modified with hooks such as useCarouselNavImageButtonStyles_unstable,
 * before being passed to renderCarouselNavImageButton_unstable.
 *
 * @param props - props from this instance of CarouselNavImageButton
 * @param ref - reference to root HTMLDivElement of CarouselNavImageButton
 */
export const useCarouselNavImageButton_unstable = (
  props: CarouselNavImageButtonProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselNavImageButtonState => {
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
