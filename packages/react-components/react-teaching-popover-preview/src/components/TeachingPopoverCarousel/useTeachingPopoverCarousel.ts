import * as React from 'react';
import { getIntrinsicElementProps, slot, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselProps,
  TeachingPopoverCarouselState,
  TeachingPopoverPageCountChildRenderFunction,
} from './TeachingPopoverCarousel.types';
import { Button } from '@fluentui/react-button';
import { useState } from 'react';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { TeachingPopoverCarouselNav } from '../TeachingPopoverCarouselNav/TeachingPopoverCarouselNav';

export const useTeachingPopoverCarousel_unstable = (
  props: TeachingPopoverCarouselProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselState => {
  const { carouselLayout = 'centered', paginationType = 'icon', strings, onPageChange, onFinish } = props;

  const appearance = usePopoverContext_unstable(context => context.appearance);
  const triggerRef = usePopoverContext_unstable(context => context.triggerRef);
  const toggleOpen = usePopoverContext_unstable(context => context.toggleOpen);

  const reactChildArray = React.Children.toArray(props.children);

  const [totalPages, setTotalPages] = useState(reactChildArray.length);

  // ToDo: Imperative setCurrentPage hook
  const [currentPage, setCurrentPage] = useControllableState({
    initialState: 0,
    defaultState: props.defaultCurrentPage,
    state: props.currentPage,
  });

  React.useEffect(() => {
    // Update total pages if child length changes.
    if (totalPages !== reactChildArray.length) {
      setTotalPages(reactChildArray.length);
    }
  }, [reactChildArray.length, totalPages, setTotalPages]);

  // Get current pagination child (w/ array safety)
  const currentPageElement =
    currentPage < reactChildArray.length ? reactChildArray[currentPage] : reactChildArray[reactChildArray.length - 1];

  const handleNextButtonClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      const nextPage = Math.min(currentPage + 1, totalPages);
      props.onClickNext?.(event, { currentPage: nextPage });
      if (event.isDefaultPrevented()) {
        return;
      }

      if (nextPage >= totalPages) {
        onFinish?.(event, { currentPage });
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
        toggleOpen(event);
      } else {
        onPageChange?.(event, { currentPage: nextPage });
        setCurrentPage(nextPage);
      }
    },
  );

  const handlePrevButtonClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      const prevPage = Math.max(currentPage - 1, 0);
      props.onClickNext?.(event, { currentPage: prevPage });
      if (event.isDefaultPrevented()) {
        return;
      }

      if (currentPage <= 0) {
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
        toggleOpen(event);
      } else {
        onPageChange?.(event, { currentPage: prevPage });
        setCurrentPage(prevPage);
      }
    },
  );

  const previous = slot.optional(props.previous, {
    defaultProps: {
      appearance: appearance === 'brand' ? 'outline' : undefined,
      children: currentPage === 0 ? strings.initialStepText : strings.previous,
      onClick: handlePrevButtonClick,
    },
    renderByDefault: true,
    elementType: Button,
  });

  const next = slot.always(props.next, {
    defaultProps: {
      appearance: appearance === 'brand' ? undefined : 'primary',
      children: currentPage === totalPages - 1 ? strings.finalStepText : strings.next,
      onClick: handleNextButtonClick,
    },
    elementType: Button,
  });

  const nav = slot.optional(props.nav, {
    defaultProps: {},
    renderByDefault: paginationType === 'icon',
    elementType: TeachingPopoverCarouselNav,
  });

  const footer = slot.always(props.footer, { elementType: 'div' });

  let pageCountTextChildren;
  if (typeof props.strings.pageCountText === 'function') {
    const renderFunc = props.children as TeachingPopoverPageCountChildRenderFunction;
    pageCountTextChildren = { children: renderFunc(currentPage, totalPages) };
  } else {
    pageCountTextChildren = { children: `${currentPage + 1} ${props.strings.pageCountText ?? '/'} ${totalPages}` };
  }
  const pageCount = slot.optional(props.nav, {
    defaultProps: { ...pageCountTextChildren },
    renderByDefault: paginationType === 'text',
    elementType: TeachingPopoverCarouselNav,
  });

  return {
    appearance,
    currentPage,
    setCurrentPage,
    onPageChange,
    totalPages,
    carouselLayout,
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
        children: currentPageElement,
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
