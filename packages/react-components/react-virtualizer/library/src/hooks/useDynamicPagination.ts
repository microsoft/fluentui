import * as React from 'react';
import { VirtualizerDynamicPaginationProps } from './hooks.types';
import { useRef } from 'react';
import { useTimeout } from '@fluentui/react-utilities';

/**
 * Optional hook that will enable pagination on the virtualizer so that it 'autoscrolls' to an items exact position
 * Sizes are dynamic so we require a progressive sizing array (passed in from Dynamic virtualizer hooks)
 * On short scrolls, we will go at minimum to the next/previous item so that arrow pagination works
 * All VirtualizerDynamicPaginationProps can be grabbed from dynamic Virtualizer hooks externally and passed in
 */
export const useDynamicVirtualizerPagination = (
  virtualizerProps: VirtualizerDynamicPaginationProps,
  paginationEnabled: Boolean = true,
) => {
  'use no memo';

  const { axis = 'vertical', currentIndex, progressiveItemSizes, virtualizerLength } = virtualizerProps;

  const [setScrollTimer, clearScrollTimer] = useTimeout();
  const lastScrollPos = useRef<number>(-1);
  const lastIndexScrolled = useRef<number>(-1);

  const scrollContainer = React.useRef<HTMLElement | null>(null);

  const clearListeners = () => {
    if (scrollContainer.current) {
      scrollContainer.current.removeEventListener('scroll', onScroll);
      scrollContainer.current = null;
      clearScrollTimer();
    }
  };

  React.useEffect(() => {
    return () => {
      clearListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handle scroll stop event and paginate to the closest item
   * If the closest item is the same as the previous scroll end
   * we paginate to the next/previous one based on direction
   *
   * Users/Virtualizer-Hooks must pass in a cumulative array of sizes
   * This prevents the need to recalculate and ensures size arrays are synced externally
   */
  const onScrollEnd = React.useCallback(() => {
    if (!scrollContainer.current || !paginationEnabled || !progressiveItemSizes?.current) {
      // No container found
      return;
    }

    const currentScrollPos = Math.round(
      axis === 'vertical' ? scrollContainer.current.scrollTop : scrollContainer.current.scrollLeft,
    );
    let closestItemPos = 0;
    let closestItem = 0;
    const endItem = Math.min(currentIndex + virtualizerLength, progressiveItemSizes.current.length);

    for (let i = currentIndex; i < endItem - 1; i++) {
      if (
        currentScrollPos <= progressiveItemSizes.current[i + 1] &&
        currentScrollPos >= progressiveItemSizes.current[i]
      ) {
        // Found our in between position
        const distanceToPrev = Math.abs(currentScrollPos - progressiveItemSizes.current[i]);
        const distanceToNext = Math.abs(progressiveItemSizes.current[i + 1] - currentScrollPos);
        if (distanceToPrev < distanceToNext) {
          closestItem = i;
        } else {
          closestItem = i + 1;
        }
        break;
      }
    }

    let nextItem;
    if (Math.round(closestItem - lastIndexScrolled.current) === 0) {
      // Special case for go to next/previous with minimum amount of scroll needed
      const nextTarget = lastScrollPos.current < currentScrollPos ? 1 : -1;
      // This will also handle a case where we scrolled to the exact correct position (noop)
      const isSecondaryScroll = Math.round(lastScrollPos.current - currentScrollPos) === 0;
      const posMod = isSecondaryScroll ? 0 : nextTarget;
      nextItem = closestItem + posMod;
    } else {
      // Pagination for anything else can just jump to the closest!
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
  }, [paginationEnabled, currentIndex, scrollContainer, virtualizerLength, axis, progressiveItemSizes]);

  /**
   * On scroll timer that will continuously delay callback until scrolling stops
   */
  const onScroll = React.useCallback(
    event => {
      clearScrollTimer();
      setScrollTimer(onScrollEnd, 100);
    },
    [onScrollEnd, clearScrollTimer, setScrollTimer],
  );

  /**
   * Pagination ref will ensure we attach listeners to containers on change
   * It is returned from hook and merged into the scroll container externally
   */
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
          scrollContainer.current.addEventListener('scroll', onScroll);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onScroll, onScrollEnd, paginationEnabled],
  );

  return paginationRef;
};
