'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useCarouselContext, useCarouselItemIndex } from '../carouselContext';
import type { CarouselCardProps, CarouselCardState } from './CarouselCard.types';

/**
 * Create the state required to render CarouselCard.
 *
 * The slide stays a focus stop for its position summary. Embedded actions keep their own tab order and keys.
 */
export const useCarouselCard = (props: CarouselCardProps, ref: React.Ref<HTMLDivElement>): CarouselCardState => {
  const { getSlideLabel, slideCount } = useCarouselContext();
  const index = useCarouselItemIndex();
  return {
    components: { root: 'div' },
    root: slot.always(
      getIntrinsicElementProps('div', {
        'aria-label': getSlideLabel(index + 1, Math.max(slideCount, index + 1)),
        tabIndex: 0,
        ...props,
        ref,
        role: 'group',
        'aria-roledescription': 'slide',
      }),
      { elementType: 'div' },
    ),
  };
};
