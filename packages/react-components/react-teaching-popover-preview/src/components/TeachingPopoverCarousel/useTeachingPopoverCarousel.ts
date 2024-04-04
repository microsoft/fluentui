import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  slot,
  useControllableState,
  useEventCallback,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselProps, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import { Button } from '@fluentui/react-button';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { TeachingPopoverCarouselNav } from '../TeachingPopoverCarouselNav/TeachingPopoverCarouselNav';
import { CarouselContext } from './Carousel/useCarouselCollection';
import { useContextSelector } from '@fluentui/react-context-selector';
import { useCarouselWalker } from './Carousel/useCarouselWalker';

export const useTeachingPopoverCarousel_unstable = (
  props: TeachingPopoverCarouselProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselState => {
  const { layout = 'centered', paginationType = 'icon', onPageChange, onFinish } = props;

  const appearance = usePopoverContext_unstable(context => context.appearance);
  const triggerRef = usePopoverContext_unstable(context => context.triggerRef);
  const toggleOpen = usePopoverContext_unstable(context => context.toggleOpen);

  const [currentPage, setCurrentPage] = useControllableState({
    initialState: 0,
    defaultState: props.defaultCurrentPage,
    state: props.currentPage,
  });

  const { walker: carouselWalker } = useCarouselWalker();

  const active = carouselWalker.active();
  console.log('active:', active);
  const store = useContextSelector(CarouselContext, c => c.store);
  const setValue = useContextSelector(CarouselContext, c => c.setValue);
  const setIndex = useContextSelector(CarouselContext, c => c.setIndex);

  const values = useSyncExternalStore(store.subscribe, () => store.getSnapshot());
  const _currentPage = useContextSelector(CarouselContext, c => values.indexOf(c.value) + 1);
  const totalPages = values.length;

  console.log('Total pages: ', totalPages);

  useIsomorphicLayoutEffect(() => {
    // Handles external updates of currentPage via props
    if (currentPage !== _currentPage) {
      setIndex(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleNextButtonClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      const nextPage = Math.min(_currentPage + 1, totalPages);
      if (event.isDefaultPrevented()) {
        return;
      }

      if (nextPage >= totalPages) {
        onFinish?.(event, { event, type: 'click', currentPage });
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
        toggleOpen(event);
      } else {
        if (active?.value) {
          const next = carouselWalker.next(active.value);
          if (next?.value) {
            setValue(next?.value);
          }
        }
        onPageChange?.(event, { event, type: 'click', currentPage: nextPage });
        setCurrentPage(nextPage);
      }
    },
  );

  const handlePrevButtonClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      const prevPage = Math.max(currentPage - 1, 0);
      if (event.isDefaultPrevented()) {
        return;
      }

      if (currentPage <= 0) {
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
        toggleOpen(event);
      } else {
        if (active?.value) {
          const prev = carouselWalker.prev(active.value);
          if (prev?.value) {
            setValue(prev.value);
          }
        }
        onPageChange?.(event, { event, type: 'click', currentPage: prevPage });
        setCurrentPage(prevPage);
      }
    },
  );

  const previous = slot.optional(props.previous, {
    defaultProps: {
      appearance: appearance === 'brand' ? 'outline' : undefined,
    },
    renderByDefault: true,
    elementType: Button,
  });

  // Merge any provided callback with previous button and handle variant text
  if (previous) {
    if (currentPage === 0) {
      previous.children = props.initialStepText;
    }
    previous.onClick = mergeCallbacks(previous?.onClick, handlePrevButtonClick);
  }

  const next = slot.always(props.next, {
    defaultProps: {
      appearance: appearance === 'brand' ? undefined : 'primary',
    },
    elementType: Button,
  });

  // Merge any provided callback with next button
  if (next) {
    if (currentPage === totalPages - 1) {
      next.children = props.finalStepText;
    }
    next.onClick = mergeCallbacks(next?.onClick, handleNextButtonClick);
  }

  const nav = slot.optional(props.nav, {
    defaultProps: {},
    renderByDefault: paginationType === 'icon',
    elementType: TeachingPopoverCarouselNav,
  });

  const footer = slot.always(props.footer, { elementType: 'div' });

  const pageCount = slot.optional(props.pageCount, {
    renderByDefault: paginationType === 'text',
    elementType: 'div',
  });

  if (pageCount) {
    // Handle customized page count localization
    if (props.renderPageCountText) {
      pageCount.children = props.renderPageCountText(currentPage, totalPages);
    } else if (typeof props.pageCount === 'string') {
      // When a string is provided, we will pre/append the localized pagination
      pageCount.children = `${currentPage + 1} ${pageCount.children ?? '/'} ${totalPages}`;
    }
  }

  return {
    appearance,
    currentPage,
    setCurrentPage,
    onPageChange,
    totalPages,
    layout,
    components: {
      root: 'div',
      footer: 'div',
      next: Button,
      previous: Button,
      nav: TeachingPopoverCarouselNav,
      pageCount: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    previous,
    next,
    nav,
    footer,
    pageCount,
  };
};
