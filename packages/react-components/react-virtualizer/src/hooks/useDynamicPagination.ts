import * as React from 'react';
import { VirtualizerDynamicPaginationProps } from './hooks.types';
import { useRef } from 'react';

export const useDynamicVirtualizerPagination = (
  virtualizerProps: VirtualizerDynamicPaginationProps,
  paginationEnabled: Boolean = true,
) => {
  const { axis = 'vertical', currentIndex, progressiveItemSizes, virtualizerLength } = virtualizerProps;

  const timeoutRef = useRef<number | null>(null);
  const lastScrollPos = useRef<number>(-1);
  const lastIndexScrolled = useRef<number>(-1);

  const scrollContainer = React.useRef<HTMLElement | null>(null);

  const clearListeners = () => {
    if (scrollContainer.current) {
      scrollContainer.current.removeEventListener('scroll', onScroll);
      scrollContainer.current = null;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  React.useEffect(() => {
    return () => {
      clearListeners();
    };
  }, []);

  const onScrollEnd = React.useCallback(() => {
    if (!scrollContainer.current || !paginationEnabled || !progressiveItemSizes?.current) {
      // No container found
      return;
    }

    let currentScrollPos = axis === 'vertical' ? scrollContainer.current.scrollTop : scrollContainer.current.scrollLeft;
    let closestItemPos = 0;
    let closestItem = 0;
    let endItem = Math.min(currentIndex + virtualizerLength, progressiveItemSizes.current.length);

    for (let i = currentIndex; i < endItem - 1; i++) {
      if (
        currentScrollPos <= progressiveItemSizes.current[i + 1] &&
        currentScrollPos >= progressiveItemSizes.current[i]
      ) {
        // Found our in between position
        let distanceToPrev = currentScrollPos - progressiveItemSizes.current[i];
        let distanceToNext = progressiveItemSizes.current[i + 1] - currentScrollPos;
        if (distanceToPrev < distanceToNext) {
          closestItem = i;
        } else {
          closestItem = i + 1;
        }
        break;
      }
    }

    let nextItem;
    if (closestItem - lastIndexScrolled.current === 0) {
      // Special case for go to next/previous with minimum amount of scroll needed
      const nextTarget = lastScrollPos.current < currentScrollPos ? 1 : -1;
      const isSecondaryScroll = lastScrollPos.current === currentScrollPos;
      const posMod = isSecondaryScroll ? 0 : nextTarget;
      nextItem = closestItem + posMod;
    } else {
      // Pagination for anything else can just jump to the closest!
      // This will also handle a case where we scrolled to the exact correct position (noop)
      nextItem = closestItem;
    }

    // Safeguard nextItem
    nextItem = Math.min(Math.max(0, nextItem), progressiveItemSizes.current.length);
    closestItemPos = progressiveItemSizes.current[nextItem];

    if (axis === 'vertical') {
      scrollContainer.current.scrollTo({ top: closestItemPos, behavior: 'smooth' });
    } else {
      scrollContainer.current.scrollTo({ left: closestItemPos, behavior: 'smooth' });
    }
    lastScrollPos.current = progressiveItemSizes.current[nextItem];
    lastIndexScrolled.current = nextItem;
  }, [
    paginationEnabled,
    currentIndex,
    progressiveItemSizes?.current,
    scrollContainer,
    scrollContainer.current,
    virtualizerLength,
  ]);

  const onScroll = React.useCallback(
    event => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(onScrollEnd, 100);
    },
    [onScrollEnd],
  );

  const paginationRef = React.useCallback(
    (instance: HTMLElement | HTMLDivElement | null) => {
      if (!paginationEnabled) {
        clearListeners();
        scrollContainer.current = null;
        return;
      }
      if (scrollContainer.current !== instance) {
        console.log('Scroll container:', scrollContainer.current);
        console.log('instance:', instance);
        clearListeners();

        scrollContainer.current = instance;
        if (scrollContainer.current) {
          scrollContainer.current.addEventListener('scroll', onScroll);
        }
      }
    },
    [onScroll, onScrollEnd, paginationEnabled],
  );

  return paginationRef;
};
