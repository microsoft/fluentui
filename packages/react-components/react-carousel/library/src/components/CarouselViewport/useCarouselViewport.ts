import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { CarouselViewportProps, CarouselViewportState } from './CarouselViewport.types';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

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
  const { cardFocus = false } = props;
  const circular = useCarouselContext(ctx => ctx.circular);
  const viewportRef = useCarouselContext(ctx => ctx.viewportRef);
  const focusableGroupAttr = useArrowNavigationGroup({
    circular,
    axis: 'horizontal',
    memorizeCurrent: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault: true,
  });

  const focusProps = cardFocus ? focusableGroupAttr : {};

  const slider: CarouselViewportState['slider'] = slot.always(props.slider, {
    defaultProps: {
      role: 'group',
      children: props.children,
      ...focusProps,
    },
    elementType: 'div',
  });

  const mergedViewportRef = useMergedRefs(ref, viewportRef);

  return {
    slider,
    cardFocus,
    components: {
      root: 'div',
      slider: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: mergedViewportRef,
        role: 'presentation',
        // Draggable ensures dragging is supported (even if not enabled)
        draggable: true,
        ...props,
        children: null,
      }),
      { elementType: 'div' },
    ),
  };
};
