import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import * as React from 'react';

import type { CarouselSliderProps, CarouselSliderState } from './CarouselSlider.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

/**
 * Create the state required to render CarouselSlider.
 *
 * The returned state can be modified with hooks such as useCarouselSliderStyles_unstable,
 * before being passed to renderCarouselSlider_unstable.
 *
 * @param props - props from this instance of CarouselSlider
 * @param ref - reference to root HTMLDivElement of CarouselSlider
 */
export const useCarouselSlider_unstable = (
  props: CarouselSliderProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselSliderState => {
  const focusableGroupAttr = useArrowNavigationGroup({
    circular: false, //Todo: Should we enable circular focus on circular carousel?
    axis: 'horizontal',
    memorizeCurrent: true,
  });

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'group',
        ...props,
        ...focusableGroupAttr,
      }),
      { elementType: 'div' },
    ),
  };
};
