import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot, useMergedRefs } from '@fluentui/react-utilities';
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
  const hasFocus = React.useRef(false);
  const hasMouse = React.useRef(false);
  const viewportRef = useCarouselContext(ctx => ctx.viewportRef);
  const enableAutoplay = useCarouselContext(ctx => ctx.enableAutoplay);

  const handleFocusCapture = React.useCallback(() => {
    hasFocus.current = true;
    // Will pause autoplay when focus is captured within viewport (if autoplay is initialized)
    enableAutoplay(false, true);
  }, [enableAutoplay]);

  const handleBlurCapture = React.useCallback(
    (e: React.FocusEvent) => {
      // Will enable autoplay (if initialized) when focus exits viewport
      if (!e.currentTarget.contains(e.relatedTarget)) {
        hasFocus.current = false;
        if (!hasMouse.current) {
          enableAutoplay(true, true);
        }
      }
    },
    [enableAutoplay],
  );

  const handleMouseEnter = React.useCallback(() => {
    hasMouse.current = true;
    enableAutoplay(false, true);
  }, [enableAutoplay]);
  const handleMouseLeave = React.useCallback(() => {
    hasMouse.current = false;
    if (!hasFocus.current) {
      enableAutoplay(true, true);
    }
  }, [enableAutoplay]);

  const onFocusCapture = mergeCallbacks(props.onFocusCapture, handleFocusCapture);
  const onBlurCapture = mergeCallbacks(props.onBlurCapture, handleBlurCapture);
  const onMouseEnter = mergeCallbacks(props.onMouseEnter, handleMouseEnter);
  const onMouseLeave = mergeCallbacks(props.onMouseLeave, handleMouseLeave);

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
        onFocusCapture,
        onBlurCapture,
        onMouseEnter,
        onMouseLeave,
      }),
      { elementType: 'div' },
    ),
  };
};
