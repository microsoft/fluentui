'use client';

import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import type {
  CarouselNavBaseProps,
  CarouselNavBaseState,
  CarouselNavProps,
  CarouselNavState,
} from './CarouselNav.types';
import { useControllableState } from '@fluentui/react-utilities';

/**
 * Create the base state required to render CarouselNav, without design-only props.
 *
 * @param props - props from this instance of CarouselNav (without appearance)
 * @param ref - reference to root HTMLDivElement of CarouselNav
 */
export const useCarouselNavBase_unstable = (
  props: CarouselNavBaseProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselNavBaseState => {
  const focusableGroupAttr = useArrowNavigationGroup({
    circular: false,
    axis: 'horizontal',
    memorizeCurrent: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault: true,
  });

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
    renderNavButton: props.children,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'tablist',
        ...props,
        ...focusableGroupAttr,
        children: null,
      }),
      { elementType: 'div' },
    ),
  };
};

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

  return {
    ...useCarouselNavBase_unstable(props, ref),
    appearance,
  };
};
