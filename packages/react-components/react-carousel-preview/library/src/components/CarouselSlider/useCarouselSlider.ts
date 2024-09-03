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
    circular: false, // We don't want circular focus here, it's confusing in carousel.
    axis: 'horizontal',
    memorizeCurrent: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault: true,
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
