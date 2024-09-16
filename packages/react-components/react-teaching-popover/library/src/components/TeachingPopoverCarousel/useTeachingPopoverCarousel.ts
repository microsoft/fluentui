import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselProps, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useCarousel_unstable, type UseCarouselOptions } from './Carousel/Carousel';

export const useTeachingPopoverCarousel_unstable = (
  props: TeachingPopoverCarouselProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselState => {
  const toggleOpen = usePopoverContext_unstable(c => c.toggleOpen);
  const handleFinish: UseCarouselOptions['onFinish'] = useEventCallback((event, data) => {
    props.onFinish?.(event, data);
    toggleOpen(event as React.MouseEvent<HTMLElement>);
  });

  const { carousel, carouselRef } = useCarousel_unstable({
    defaultValue: props.defaultValue,
    value: props.value,
    onValueChange: props.onValueChange,
    onFinish: handleFinish,
  });

  const appearance = usePopoverContext_unstable(context => context.appearance);
  return {
    appearance,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, carouselRef),
        ...props,
      }),
      { elementType: 'div' },
    ),
    ...carousel,
  };
};
