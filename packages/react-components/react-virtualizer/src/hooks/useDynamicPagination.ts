import * as React from 'react';
import { VirtualizerDynamicPaginationProps } from './hooks.types';
import { useRef } from 'react';

export const useDynamicVirtualizerPagination = (
  virtualizerProps: VirtualizerDynamicPaginationProps,
  paginationEnabled: Boolean = true,
) => {
  const { axis = 'vertical', currentIndex, progressiveItemSizes, virtualizerLength } = virtualizerProps;

  const timeoutRef = useRef<number | null>(null);
  const lastScrollPos = useRef<number>(0);
  const lastIndexScrolled = useRef<number>(0);

  const scrollContainer = React.useRef<HTMLElement | null>(null);

  const clearListeners = () => {
    if (scrollContainer.current) {
      if ('onScrollEnd' in window) {
        scrollContainer.current.removeEventListener('scrollEnd', onScrollEnd);
      } else {
        scrollContainer.current.removeEventListener('scroll', onScroll);
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          closestItemPos = progressiveItemSizes.current[i];
          closestItem = i;
        } else {
          closestItemPos = progressiveItemSizes.current[i + 1];
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
      closestItemPos = progressiveItemSizes.current[nextItem];
    } else {
      // Pagination for anything else can just jump to the closest!
      nextItem = closestItem;
    }

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
        clearListeners();

        scrollContainer.current = instance;
        if (scrollContainer.current) {
          if ('onScrollEnd' in window) {
            scrollContainer.current.addEventListener('scrollEnd', onScrollEnd);
          } else {
            scrollContainer.current.addEventListener('scroll', onScroll);
          }
        }
      }
    },
    [onScroll, onScrollEnd, paginationEnabled],
  );

  return paginationRef;
};
