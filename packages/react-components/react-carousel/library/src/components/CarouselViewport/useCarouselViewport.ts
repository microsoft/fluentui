import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { CarouselViewportProps, CarouselViewportState } from './CarouselViewport.types';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';

/**
 * Create the state required to render CarouselViewport.
 *
 * The returned state can be modified with hooks such as useCarouselViewportStyles_unstable,
 * before being passed to renderCarouselViewport_unstable.
 *
 * @param props - props from this instance of CarouselViewport
 * @param ref - reference to root HTMLDivElement of CarouselViewport
 */
export const useCarouselViewport_unstable = (
  props: CarouselViewportProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselViewportState => {
  const viewportRef = useCarouselContext(ctx => ctx.viewportRef);

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, viewportRef),
        role: 'presentation',
        // Draggable ensures dragging is supported (even if not enabled)
        draggable: true,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
