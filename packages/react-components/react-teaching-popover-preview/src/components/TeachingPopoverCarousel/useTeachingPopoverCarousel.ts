import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselProps, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useCarousel_unstable } from './Carousel/Carousel';
import { TeachingPopoverCarouselFooter } from '../TeachingPopoverCarouselFooter/index';

export const useTeachingPopoverCarousel_unstable = (
  props: TeachingPopoverCarouselProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselState => {
  const { carousel, carouselWalker, carouselRef } = useCarousel_unstable({
    defaultValue: props.defaultValue,
    value: props.value,
  });

  const appearance = usePopoverContext_unstable(context => context.appearance);
  const footer = slot.always(props.footer, { elementType: TeachingPopoverCarouselFooter });

  return {
    appearance,
    components: {
      root: 'div',
      footer: TeachingPopoverCarouselFooter,
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, carouselRef),
        ...props,
      }),
      { elementType: 'div' },
    ),
    footer,
    carouselWalker,
    ...carousel,
  };
};
