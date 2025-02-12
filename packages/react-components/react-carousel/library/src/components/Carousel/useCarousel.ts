import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  getIntrinsicElementProps,
  slot,
  useEventCallback,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { EventHandler } from '@fluentui/react-utilities';
import * as React from 'react';

import type { CarouselProps, CarouselState } from './Carousel.types';
import type { CarouselContextValue, CarouselIndexChangeData } from '../CarouselContext.types';
import { useEmblaCarousel } from '../useEmblaCarousel';
import { useAnnounce } from '@fluentui/react-shared-contexts';

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
    announcement,
    motion = 'slide',
  } = props;

  const { dir } = useFluent();

  const onCarouselIndexChange: EventHandler<CarouselIndexChangeData> = useEventCallback((event, data) => {
    onActiveIndexChange?.(event, data);
    updateAnnouncement(data.index);
  });

  const { activeIndex, carouselApi, containerRef, viewportRef, subscribeForValues, enableAutoplay, resetAutoplay } =
    useEmblaCarousel({
      align,
      direction: dir,
      loop: circular,
      slidesToScroll: groupSize,
      defaultActiveIndex: props.defaultActiveIndex,
      activeIndex: props.activeIndex,
      watchDrag: draggable,
      containScroll: whitespace ? false : 'keepSnaps',
      motion,
      onDragIndexChange: onCarouselIndexChange,
      onAutoplayIndexChange: onActiveIndexChange,
    });

  const selectPageByElement: CarouselContextValue['selectPageByElement'] = useEventCallback((event, element, jump) => {
    const foundIndex = carouselApi.scrollToElement(element, jump);
    onCarouselIndexChange?.(event, { event, type: 'focus', index: foundIndex });

    return foundIndex;
  });

  const selectPageByIndex: CarouselContextValue['selectPageByIndex'] = useEventCallback((event, index, jump) => {
    carouselApi.scrollToIndex(index, jump);
    onCarouselIndexChange?.(event, { event, type: 'click', index });
  });

  const selectPageByDirection: CarouselContextValue['selectPageByDirection'] = useEventCallback((event, direction) => {
    const nextPageIndex = carouselApi.scrollInDirection(direction);
    onCarouselIndexChange?.(event, { event, type: 'click', index: nextPageIndex });
    return nextPageIndex;
  });

  const mergedContainerRef = useMergedRefs(ref, containerRef);

  // Announce carousel updates
  const announcementTextRef = React.useRef<string>('');
  const totalNavLength = React.useRef<number>(0);
  const navGroupRef = React.useRef<number[][]>([]);

  const { announce } = useAnnounce();

  const updateAnnouncement = useEventCallback((newIndex: number) => {
    if (totalNavLength.current <= 0 || !announcement) {
      // Ignore announcements until slides discovered
      return;
    }

    const announcementText = announcement(newIndex, totalNavLength.current, navGroupRef.current);

    if (announcementText !== announcementTextRef.current) {
      announcementTextRef.current = announcementText;
      announce(announcementText, { polite: true });
    }
  });

  useIsomorphicLayoutEffect(() => {
    // Subscribe to any non-index carousel state changes
    return subscribeForValues(data => {
      if (totalNavLength.current <= 0 && data.navItemsCount > 0 && announcement) {
        const announcementText = announcement(data.activeIndex, data.navItemsCount, data.groupIndexList);
        // Initialize our string to prevent updateAnnouncement from reading an initial load
        announcementTextRef.current = announcementText;
      }
      totalNavLength.current = data.navItemsCount;
      navGroupRef.current = data.groupIndexList;
      updateAnnouncement(data.activeIndex);
    });
  }, [subscribeForValues, updateAnnouncement, announcement]);

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: mergedContainerRef,
        role: 'region',
        ...props,
      }),
      { elementType: 'div' },
    ),

    activeIndex,
    circular,
    containerRef: mergedContainerRef,
    viewportRef,
    selectPageByElement,
    selectPageByDirection,
    selectPageByIndex,
    subscribeForValues,
    enableAutoplay,
    resetAutoplay,
  };
}
