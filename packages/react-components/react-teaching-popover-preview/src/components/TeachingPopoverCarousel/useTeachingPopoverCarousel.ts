import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  slot,
  useEventCallback,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselProps, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import { Button } from '@fluentui/react-button';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { TeachingPopoverCarouselNav } from '../TeachingPopoverCarouselNav/TeachingPopoverCarouselNav';
import { useCarousel_unstable } from './Carousel/Carousel';

export const useTeachingPopoverCarousel_unstable = (
  props: TeachingPopoverCarouselProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselState => {
  const {
    layout = 'centered',
    paginationType = 'icon',
    onPageChange,
    onFinish,
    currentPage,
    defaultCurrentPage,
  } = props;
  const { carousel, carouselWalker, carouselRef } = useCarousel_unstable();

  const { store, setValue, setIndex, currentIndex: _currentPage } = carousel;

  const appearance = usePopoverContext_unstable(context => context.appearance);
  const triggerRef = usePopoverContext_unstable(context => context.triggerRef);
  const toggleOpen = usePopoverContext_unstable(context => context.toggleOpen);

  const values = useSyncExternalStore(store.subscribe, () => store.getSnapshot());
  const totalPages = values.length;

  useIsomorphicLayoutEffect(() => {
    // Handles default initialization page on mount
    if (defaultCurrentPage !== undefined && defaultCurrentPage !== _currentPage) {
      setIndex(defaultCurrentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIsomorphicLayoutEffect(() => {
    // Handles external updates of currentPage via props
    if (currentPage !== undefined && currentPage !== _currentPage) {
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

      const active = carouselWalker.active();
      console.log('NEXT ACTIVE: ', active);
      console.log('NEXT VALUE: ', active?.value);

      if (nextPage >= totalPages) {
        onFinish?.(event, { event, type: 'click', index: _currentPage, value: values[_currentPage] });
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
        toggleOpen(event);
      } else {
        if (active?.value) {
          const next = carouselWalker.nextPage(active.value);
          if (next?.value) {
            setValue(next?.value);
          }
          onPageChange?.(event, { event, type: 'click', index: nextPage, value: next?.value });
        }
      }
    },
  );

  const handlePrevButtonClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      const prevPage = Math.max(_currentPage - 1, 0);
      if (event.isDefaultPrevented()) {
        return;
      }

      const active = carouselWalker.active();
      console.log('PREV ACTIVE: ', active);
      console.log('PREV VALUE: ', active?.value);
      if (_currentPage <= 0) {
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
        toggleOpen(event);
      } else {
        if (active?.value) {
          const prev = carouselWalker.prevPage(active.value);
          if (prev?.value) {
            setValue(prev.value);
          }
          onPageChange?.(event, { event, type: 'click', index: prevPage, value: prev?.value });
        }
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
    if (_currentPage === 0) {
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
    if (_currentPage === totalPages - 1) {
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
      pageCount.children = props.renderPageCountText(_currentPage, totalPages);
    } else if (typeof props.pageCount === 'string') {
      // When a string is provided, we will pre/append the localized pagination
      pageCount.children = `${_currentPage + 1} ${pageCount.children ?? '/'} ${totalPages}`;
    }
  }

  return {
    appearance,
    onPageChange,
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
        ref: useMergedRefs(ref, carouselRef),
        ...props,
      }),
      { elementType: 'div' },
    ),
    previous,
    next,
    nav,
    footer,
    pageCount,
    ...carouselWalker,
    ...carousel,
  };
};
