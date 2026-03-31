'use client';

import { getIntrinsicElementProps, slot, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import type { CarouselNavProps, CarouselNavState } from './CarouselNav.types';
import { useControllableState } from '@fluentui/react-utilities';

/**
 * Create the state required to render CarouselNav.
 *
 * The returned state can be modified with hooks such as useCarouselNavStyles_unstable,
 * before being passed to renderCarouselNav_unstable.
 *
 * @param props - props from this instance of CarouselNav
 * @param ref - reference to root HTMLDivElement of CarouselNav
 */
export const useCarouselNav_unstable = (props: CarouselNavProps, ref: React.Ref<HTMLDivElement>): CarouselNavState => {
  const { appearance } = props;

  // Users can choose controlled or uncontrolled, if uncontrolled, the default is initialized by carousel context
  const [totalSlides, setTotalSlides] = useControllableState({
    state: props.totalSlides,
    initialState: 0,
  });

  const subscribeForValues = useCarouselContext(ctx => ctx.subscribeForValues);

  useIsomorphicLayoutEffect(() => {
    return subscribeForValues(data => {
      setTotalSlides(data.navItemsCount);
    });
  }, [subscribeForValues, setTotalSlides]);

  return {
    totalSlides,
    appearance,
    renderNavButton: props.children,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'tablist',
        ...props,
        focusgroup: 'tablist nowrap nomemory',
        children: null,
      }),
      { elementType: 'div' },
    ),
  };
};
