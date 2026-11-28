'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { CarouselSlideCountContext, useCarouselContext, useCarouselItemIndex } from '../carouselContext';
import type { CarouselCardProps, CarouselCardState } from './CarouselCard.types';

/**
 * Create the state required to render CarouselCard.
 *
 * The slide stays a focus stop for its position summary. Embedded actions keep their own tab order and keys.
 */
export const useCarouselCard = (props: CarouselCardProps, ref: React.Ref<HTMLDivElement>): CarouselCardState => {
  const { getSlideLabel, slideCount } = useCarouselContext();
  const index = useCarouselItemIndex();
  // The viewport's render-time count is correct on the server, before the root learns it in a layout effect.
  const total = React.useContext(CarouselSlideCountContext) ?? slideCount;
  return {
    components: { root: 'div' },
    root: slot.always(
      {
        'aria-label': getSlideLabel(index + 1, Math.max(total, index + 1)),
        tabIndex: 0,
        ...props,
        ref,
        role: 'group',
        'aria-roledescription': 'slide',
      },
      { elementType: 'div' },
    ),
  };
};
