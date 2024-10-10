import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import * as React from 'react';

import type { CarouselSliderProps, CarouselSliderState } from './CarouselSlider.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';

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
  const { cardFocus = false } = props;
  const circular = useCarouselContext(ctx => ctx.circular);
  const focusableGroupAttr = useArrowNavigationGroup({
    circular,
    axis: 'horizontal',
    memorizeCurrent: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault: true,
  });

  const focusProps = cardFocus ? focusableGroupAttr : {};

  return {
    cardFocus,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'group',
        ...props,
        ...focusProps,
      }),
      { elementType: 'div' },
    ),
  };
};
