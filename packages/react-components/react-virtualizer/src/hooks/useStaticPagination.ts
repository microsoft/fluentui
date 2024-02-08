import * as React from 'react';
import { VirtualizerStaticPaginationProps } from './hooks.types';
import { useRef } from 'react';

export const useStaticVirtualizerPagination = (
  virtualizerProps: VirtualizerStaticPaginationProps,
  paginationEnabled: Boolean = true,
) => {
  const { itemSize, axis = 'vertical' } = virtualizerProps;

  const timeoutRef = useRef<number | null>(null);
  const lastScrollRef = useRef<number>(0);
  const isAutomatedScrolling = useRef<boolean>(false);

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

    const currentScrollPos =
      axis === 'vertical' ? scrollContainer.current.scrollTop : scrollContainer.current.scrollLeft;

    if (isAutomatedScrolling.current) {
      // Our own scroll function will cause this to re-fire
      lastScrollRef.current = currentScrollPos;
      isAutomatedScrolling.current = false;
      return;
    }
    const closestItem = Math.round(currentScrollPos / itemSize);
    // We minus one so we include the edge pixel
    const closestItemPos = closestItem * itemSize;
    if (axis === 'vertical') {
      scrollContainer.current.scrollTo({ top: closestItemPos, behavior: 'smooth' });
    } else {
      scrollContainer.current.scrollTo({ left: closestItemPos, behavior: 'smooth' });
    }

    if (scrollContainer.current) {
      lastScrollRef.current = currentScrollPos;
    }
    isAutomatedScrolling.current = true;
  }, [paginationEnabled]);

  const onScroll = React.useCallback(event => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(onScrollEnd, 100);
  }, []);

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
