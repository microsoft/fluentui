import * as React from 'react';
import { VirtualizerStaticPaginationProps } from './hooks.types';
import { useRef } from 'react';

export const useStaticVirtualizerPagination = (
  virtualizerProps: VirtualizerStaticPaginationProps,
  paginationEnabled: Boolean = true,
) => {
  const { itemSize, axis = 'vertical' } = virtualizerProps;

  const timeoutRef = useRef<number | null>(null);
  const lastScrollPos = useRef<number>(0);
  const lastIndexScrolled = useRef<number>(0);

  const scrollContainer = React.useRef<HTMLElement | null>(null);

  const clearListeners = () => {
    if (scrollContainer.current) {
      if ('onscrollend' in window) {
        scrollContainer.current.removeEventListener('scrollend', onScrollEnd);
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
    console.log('On scroll end');
    if (!scrollContainer.current || !paginationEnabled) {
      // No container found
      return;
    }

    const currentScrollPos =
      axis === 'vertical' ? scrollContainer.current.scrollTop : scrollContainer.current.scrollLeft;
    const closestItem = Math.round(currentScrollPos / itemSize);

    let nextItem = 0;
    if (closestItem - lastIndexScrolled.current === 0) {
      // Special case for go to next/previous with minimum amount of scroll needed
      const nextTarget = lastScrollPos.current < currentScrollPos ? 1 : -1;
      console.log('Next target: ', nextTarget);
      const isSecondaryScroll = lastScrollPos.current === currentScrollPos;
      console.log('isSecondaryScroll: ', isSecondaryScroll);
      const posMod = isSecondaryScroll ? 0 : nextTarget;
      console.log('posMod: ', posMod);

      console.log('going to item: ', closestItem + posMod);
      nextItem = closestItem + posMod;
    } else {
      // Pagination for anything else can just jump to the closest!
      nextItem = closestItem;
    }

    const nextItemPos = nextItem * itemSize;
    console.log('closestItemPos: ', nextItemPos);

    if (axis === 'vertical') {
      scrollContainer.current.scrollTo({ top: nextItemPos, behavior: 'smooth' });
    } else {
      scrollContainer.current.scrollTo({ left: nextItemPos, behavior: 'smooth' });
    }
    lastScrollPos.current = nextItemPos;
    lastIndexScrolled.current = nextItem;
  }, [paginationEnabled]);

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
          if ('onscrollend' in window) {
            scrollContainer.current.addEventListener('scrollend', onScrollEnd);
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
