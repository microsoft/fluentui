'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import { toDataAttributeValue } from '../../../utils/toDataAttributeValue';
import { useCarouselContext } from '../carouselContext';
import type { CarouselViewportProps, CarouselViewportState } from './CarouselViewport.types';

/**
 * Create the state required to render CarouselViewport.
 *
 * Groups its children into pages, reports the slide count to `Carousel`, and exposes the live region
 * that announces settled groups.
 */
export const useCarouselViewport = (
  props: CarouselViewportProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselViewportState => {
  const context = useCarouselContext();
  const { groupSize, setSlideCount } = context;
  const { children, ...rest } = props;
  const slides = React.useMemo(() => React.Children.toArray(children), [children]);
  const pages = React.useMemo(
    () =>
      Array.from({ length: Math.ceil(slides.length / groupSize) }, (_, i) =>
        slides.slice(i * groupSize, (i + 1) * groupSize),
      ),
    [slides, groupSize],
  );
  useIsomorphicLayoutEffect(() => setSlideCount(slides.length), [slides.length, setSlideCount]);
  useIsomorphicLayoutEffect(() => () => setSlideCount(0), [setSlideCount]);
  const viewportRef = useMergedRefs(ref, context.viewportRef);

  return {
    components: { root: 'div' },
    root: Object.assign(
      slot.always(
        getIntrinsicElementProps('div', {
          ...rest,
          ref: viewportRef,
          id: context.viewportId,
          'aria-live': context.playing ? ('off' as const) : ('polite' as const),
          'aria-atomic': true,
          'aria-busy': context.busy,
        }),
        { elementType: 'div' },
      ),
      {
        'data-group-size': groupSize,
        'data-paged': toDataAttributeValue(context.paged),
        'data-buttons': toDataAttributeValue(context.buttons),
        'data-nav': toDataAttributeValue(context.nav),
        'data-transitioning': toDataAttributeValue(context.busy),
      },
    ),
    pages,
    idPrefix: context.idPrefix,
    groupSize,
    activeIndex: context.activeIndex,
    outgoingIndex: context.outgoingIndex,
    paged: context.paged,
    nav: context.nav,
    getPageLabel: context.getPageLabel,
  };
};
