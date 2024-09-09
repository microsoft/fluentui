import * as React from 'react';
import { VirtualizerStaticPaginationProps } from './hooks.types';
import { useRef } from 'react';
import { useTimeout } from '@fluentui/react-utilities';

/**
 * Optional hook that will enable pagination on the virtualizer so that it 'autoscrolls' to an items exact position
 * Sizes are uniform/static, we round to the nearest item on long scrolls
 * On short scrolls, we will go at minimum to the next/previous item so that arrow pagination works
 * All VirtualizerStaticPaginationProps can be grabbed from Virtualizer hooks externally and passed in
 */
export const useStaticVirtualizerPagination = (
  virtualizerProps: VirtualizerStaticPaginationProps,
  paginationEnabled: Boolean = true,
) => {
  'use no memo';

  const { itemSize, axis = 'vertical' } = virtualizerProps;

  const [setScrollTimer, clearScrollTimer] = useTimeout();
  const lastScrollPos = useRef<number>(0);
  const lastIndexScrolled = useRef<number>(0);

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
   */
  const onScrollEnd = React.useCallback(() => {
    if (!scrollContainer.current || !paginationEnabled) {
      // No container found
      return;
    }

    const currentScrollPos = Math.round(
      axis === 'vertical' ? scrollContainer.current.scrollTop : scrollContainer.current.scrollLeft,
    );
    const closestItem = Math.round(currentScrollPos / itemSize);

    let nextItem = 0;
    if (Math.round(closestItem - lastIndexScrolled.current) === 0) {
      // Special case for go to next/previous with minimum amount of scroll needed
      const nextTarget = lastScrollPos.current < currentScrollPos ? 1 : -1;
      const isSecondaryScroll = lastScrollPos.current === currentScrollPos;
      const posMod = isSecondaryScroll ? 0 : nextTarget;

      nextItem = closestItem + posMod;
    } else {
      // Pagination for anything else can just jump to the closest!
      nextItem = closestItem;
    }

    const nextItemPos = nextItem * itemSize;

    if (axis === 'vertical') {
      scrollContainer.current.scrollTo({ top: nextItemPos, behavior: 'smooth' });
    } else {
      scrollContainer.current.scrollTo({ left: nextItemPos, behavior: 'smooth' });
    }
    lastScrollPos.current = nextItemPos;
    lastIndexScrolled.current = nextItem;
  }, [paginationEnabled, axis, itemSize]);

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
