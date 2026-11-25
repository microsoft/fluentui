'use client';

import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type * as React from 'react';

import type {
  TeachingPopoverCarouselNavBaseProps,
  TeachingPopoverCarouselNavBaseState,
  TeachingPopoverCarouselNavProps,
  TeachingPopoverCarouselNavState,
} from './TeachingPopoverCarouselNav.types';
import { useCarouselValues_unstable } from '../TeachingPopoverCarousel/Carousel/useCarouselValues';

/**
 * Base hook that builds TeachingPopoverCarouselNav state for behavior and structure only.
 * Does not call `useArrowNavigationGroup` from `@fluentui/react-tabster`.
 * @param props - TeachingPopoverCarouselNav properties
 * @param ref - reference to root HTMLElement of TeachingPopoverCarouselNav
 */
export const useTeachingPopoverCarouselNavBase_unstable = (
  props: TeachingPopoverCarouselNavBaseProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselNavBaseState => {
  const values = useCarouselValues_unstable(snapshot => snapshot);

  return {
    values,
    renderNavButton: props.children,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'tablist',
        tabIndex: 0,
        ...props,
        children: null,
      }),
      { elementType: 'div' },
    ),
  };
};

/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverCarouselNav properties
 * @param ref - reference to root HTMLElement of TeachingPopoverCarouselNav
 */
export const useTeachingPopoverCarouselNav_unstable = (
  props: TeachingPopoverCarouselNavProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselNavState => {
  const state = useTeachingPopoverCarouselNavBase_unstable(props, ref);

  const focusableGroupAttr = useArrowNavigationGroup({
    circular: false,
    axis: 'horizontal',
    memorizeCurrent: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault: true,
  });

  return {
    ...state,
    root: {
      ...state.root,
      ...focusableGroupAttr,
    },
  };
};
