'use client';

import type * as React from 'react';
import { slot, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselBaseProps,
  TeachingPopoverCarouselBaseState,
  TeachingPopoverCarouselProps,
  TeachingPopoverCarouselState,
} from './TeachingPopoverCarousel.types';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useCarousel_unstable } from './Carousel/Carousel';

/**
 * Base hook that builds TeachingPopoverCarousel state for behavior and structure only.
 * Does not read `appearance` from the popover context.
 * @param props - TeachingPopoverCarousel properties
 * @param ref - reference to root HTMLElement of TeachingPopoverCarousel
 */
export const useTeachingPopoverCarouselBase_unstable = (
  props: TeachingPopoverCarouselBaseProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselBaseState => {
  const { announcement, defaultValue, value, onValueChange, onFinish, ...rest } = props;
  const toggleOpen = usePopoverContext_unstable(c => c.toggleOpen);
  const handleFinish: TeachingPopoverCarouselProps['onFinish'] = useEventCallback((event, data) => {
    onFinish?.(event, data);
    toggleOpen(event as React.MouseEvent<HTMLElement>);
  });

  const { carousel, carouselRef } = useCarousel_unstable({
    announcement,
    defaultValue,
    value,
    onValueChange,
    onFinish: handleFinish,
  });

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      {
        ref: useMergedRefs(ref, carouselRef),
        ...rest,
      },
      { elementType: 'div' },
    ),
    ...carousel,
  };
};

export const useTeachingPopoverCarousel_unstable = (
  props: TeachingPopoverCarouselProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselState => {
  const baseState = useTeachingPopoverCarouselBase_unstable(props, ref);
  const appearance = usePopoverContext_unstable(context => context.appearance);

  return {
    ...baseState,
    appearance,
  };
};
