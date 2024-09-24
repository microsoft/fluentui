import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  getIntrinsicElementProps,
  slot,
  useEventCallback,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import * as React from 'react';

import type { CarouselProps, CarouselState } from './Carousel.types';
import type { CarouselContextValue } from '../CarouselContext.types';
import { useEmblaCarousel } from '../useEmblaCarousel';
import { useAriaLiveAnnouncer_unstable } from '@fluentui/react-aria';

/**
 * Create the state required to render Carousel.
 *
 * The returned state can be modified with hooks such as useCarouselStyles_unstable,
 * before being passed to renderCarousel_unstable.
 *
 * @param props - props from this instance of Carousel
 * @param ref - reference to root HTMLDivElement of Carousel
 */
export function useCarousel_unstable(props: CarouselProps, ref: React.Ref<HTMLDivElement>): CarouselState {
  'use no memo';

  const {
    align = 'center',
    circular = false,
    onActiveIndexChange,
    groupSize = 'auto',
    draggable = false,
    whitespace = false,
    polite = true,
    announcement,
  } = props;

  const { dir } = useFluent();
  const { activeIndex, carouselApi, containerRef, subscribeForValues, enableAutoplay, resetAutoplay } =
    useEmblaCarousel({
      align,
      direction: dir,
      loop: circular,
      slidesToScroll: groupSize,
      defaultActiveIndex: props.defaultActiveIndex,
      activeIndex: props.activeIndex,
      watchDrag: draggable,
      containScroll: whitespace ? false : 'keepSnaps',
    });

  const selectPageByElement: CarouselContextValue['selectPageByElement'] = useEventCallback((event, element, jump) => {
    const foundIndex = carouselApi.scrollToElement(element, jump);
    onActiveIndexChange?.(event, { event, type: 'focus', index: foundIndex });

    return foundIndex;
  });

  const selectPageByIndex: CarouselContextValue['selectPageByIndex'] = useEventCallback((event, index, jump) => {
    carouselApi.scrollToIndex(index, jump);

    onActiveIndexChange?.(event, { event, type: 'click', index });
  });

  const selectPageByDirection: CarouselContextValue['selectPageByDirection'] = useEventCallback((event, direction) => {
    const nextPageIndex = carouselApi.scrollInDirection(direction);
    onActiveIndexChange?.(event, { event, type: 'click', index: nextPageIndex });

    return nextPageIndex;
  });

  const mergedRefs = useMergedRefs(ref, containerRef);

  // Announce carousel updates
  const announcementTextRef = React.useRef<string>('');
  const totalNavLength = React.useRef<number>(0);
  const navGroupRef = React.useRef<number[][]>([]);

  const { announce } = useAriaLiveAnnouncer_unstable(props);

  const updateAnnouncement = useEventCallback(() => {
    if (totalNavLength.current <= 0 || !announcement) {
      // Ignore announcements until slides discovered
      return;
    }

    const announcementText = announcement(activeIndex, totalNavLength.current, navGroupRef.current);

    if (announcementTextRef.current === '') {
      // The first valid announcement text will be set, but ignored (page load)
      announcementTextRef.current = announcementText;
    } else if (announcementText !== announcementTextRef.current) {
      announcementTextRef.current = announcementText;
      announce(announcementText, { polite });
    }
  });

  useIsomorphicLayoutEffect(() => {
    return subscribeForValues(data => {
      totalNavLength.current = data.navItemsCount;
      navGroupRef.current = data.groupIndexList;
      updateAnnouncement();
    });
  }, [subscribeForValues]);

  useIsomorphicLayoutEffect(() => {
    updateAnnouncement();
  }, [activeIndex]);

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: mergedRefs,
        role: 'region',
        ...props,
      }),
      { elementType: 'div' },
    ),

    activeIndex,
    circular,
    containerRef: mergedRefs,
    selectPageByElement,
    selectPageByDirection,
    selectPageByIndex,
    subscribeForValues,
    enableAutoplay,
    resetAutoplay,
  };
}
