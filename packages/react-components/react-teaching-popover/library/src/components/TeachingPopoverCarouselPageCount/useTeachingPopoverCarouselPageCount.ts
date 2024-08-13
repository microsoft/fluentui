import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselPageCountProps,
  TeachingPopoverCarouselPageCountState,
} from './TeachingPopoverCarouselPageCount.types';
import { useCarouselValues_unstable } from '../TeachingPopoverCarousel/Carousel/useCarouselValues';
import { useCarouselContext_unstable } from '../TeachingPopoverCarousel/Carousel/CarouselContext';

/**
 * Create the state required to render TeachingPopoverCarouselPageCount.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverCarouselPageCountStyles_unstable,
 * before being passed to renderTeachingPopoverCarouselPageCount_unstable.
 *
 * @param props - props from this instance of TeachingPopoverCarouselPageCount
 * @param ref - reference to root HTMLDivElement of TeachingPopoverCarouselPageCount
 */
export const useTeachingPopoverCarouselPageCount_unstable = (
  props: TeachingPopoverCarouselPageCountProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselPageCountState => {
  const values = useCarouselValues_unstable(snapshot => snapshot);

  const selectedValue = useCarouselContext_unstable(c => c.value) ?? values[0];
  const currentIndex = values.indexOf(selectedValue);
  const totalPages = values.length;

  return {
    currentIndex,
    totalPages,
    renderPageCount: props.children,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
        children: props.children(currentIndex + 1, totalPages),
      }),
      { elementType: 'div' },
    ),
  };
};
