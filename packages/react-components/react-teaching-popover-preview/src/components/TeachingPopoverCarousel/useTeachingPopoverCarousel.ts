import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselProps, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';

/**
 * Create the state required to render TeachingPopoverCarousel.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverCarouselStyles_unstable,
 * before being passed to renderTeachingPopoverCarousel_unstable.
 *
 * @param props - props from this instance of TeachingPopoverCarousel
 * @param ref - reference to root HTMLDivElement of TeachingPopoverCarousel
 */
export const useTeachingPopoverCarousel_unstable = (
  props: TeachingPopoverCarouselProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselState => {
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
