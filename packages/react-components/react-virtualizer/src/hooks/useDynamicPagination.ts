import * as React from 'react';
import { VirtualizerDynamicPaginationProps } from './hooks.types';
import { useRef } from 'react';

export const useDynamicVirtualizerPagination = (
  virtualizerProps: VirtualizerDynamicPaginationProps,
  paginationEnabled: Boolean = true,
) => {
  const { axis = 'vertical', currentIndex, progressiveItemSizes, virtualizerLength } = virtualizerProps;

  const timeoutRef = useRef<number | null>(null);

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
    if (!scrollContainer.current || !paginationEnabled) {
      // No container found
      return;
    }

    let currentScrollPos = axis === 'vertical' ? scrollContainer.current.scrollTop : scrollContainer.current.scrollLeft;

    // const closestItem = Math.round(currentScrollPos / itemSize);
    // // We minus one so we include the edge pixel
    // const closestItemPos = closestItem * itemSize;
    let closestItemPos;
    let endItem = Math.min(currentIndex + virtualizerLength, progressiveItemSizes.length);

    for (let i = currentIndex; i < endItem - 1; i++) {
      if (currentScrollPos <= progressiveItemSizes[i + 1] && currentScrollPos >= progressiveItemSizes[i]) {
        // Found our in between position
        let distanceToPrev = currentScrollPos - progressiveItemSizes[i];
        let distanceToNext = progressiveItemSizes[i + 1] - currentScrollPos;
        if (distanceToPrev < distanceToNext) {
          closestItemPos = progressiveItemSizes[i];
        } else {
          closestItemPos = progressiveItemSizes[i + 1];
        }
        break;
      }
    }

    if (axis === 'vertical') {
      scrollContainer.current.scrollTo({ top: closestItemPos, behavior: 'smooth' });
    } else {
      scrollContainer.current.scrollTo({ left: closestItemPos, behavior: 'smooth' });
    }
  }, [
    paginationEnabled,
    currentIndex,
    progressiveItemSizes,
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
