import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { CarouselFooterProps, CarouselFooterState } from './CarouselFooter.types';

/**
 * Create the state required to render CarouselFooter.
 *
 * The returned state can be modified with hooks such as useCarouselFooterStyles_unstable,
 * before being passed to renderCarouselFooter_unstable.
 *
 * @param props - props from this instance of CarouselFooter
 * @param ref - reference to root HTMLDivElement of CarouselFooter
 */
export const useCarouselFooter_unstable = (
  props: CarouselFooterProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselFooterState => {
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
