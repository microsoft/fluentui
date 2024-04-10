import { Button } from '@fluentui/react-button';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { getIntrinsicElementProps, mergeCallbacks, slot, useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';

import { useCarouselContext_unstable } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import { useCarouselValues_unstable } from '../TeachingPopoverCarousel/Carousel/useCarouselValues';
import { TeachingPopoverCarouselNav } from '../TeachingPopoverCarouselNav/TeachingPopoverCarouselNav';
import type {
  TeachingPopoverCarouselFooterProps,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';

export const useTeachingPopoverCarouselFooter_unstable = (
  props: TeachingPopoverCarouselFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselFooterState => {
  const { layout = 'centered', paginationType = 'icon' } = props;

  const appearance = usePopoverContext_unstable(context => context.appearance);
  const selectPageByDirection = useCarouselContext_unstable(c => c.selectPageByDirection);
  const values = useCarouselValues_unstable(values => values);

  const activeIndex = useCarouselContext_unstable(c => (c.value === null ? 0 : values.indexOf(c.value)));
  const totalPages = values.length;

  const handleNextButtonClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      if (event.isDefaultPrevented()) {
        return;
      }

      selectPageByDirection(event, 'next');
    },
  );

  const handlePrevButtonClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      if (event.isDefaultPrevented()) {
        return;
      }

      selectPageByDirection(event, 'prev');
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
    if (activeIndex === 0) {
      // We conditionally render the text based on whether initial page or not
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
  if (activeIndex === values.length - 1) {
    next.children = props.finalStepText;
  }
  next.onClick = mergeCallbacks(next?.onClick, handleNextButtonClick);

  const nav =
    paginationType === 'icon'
      ? slot.optional(props.nav, {
          renderByDefault: true,
          elementType: TeachingPopoverCarouselNav,
        })
      : undefined;

  const pageCount =
    paginationType === 'text'
      ? slot.optional(props.pageCount, {
          renderByDefault: true,
          elementType: 'div',
        })
      : undefined;

  if (pageCount) {
    // Handle customized page count localization
    if (props.renderPageCountText) {
      pageCount.children = props.renderPageCountText(activeIndex + 1, totalPages);
    } else if (typeof props.pageCount === 'string') {
      // When a string is provided, we will pre/append the localized pagination
      pageCount.children = `${activeIndex + 1} ${pageCount.children ?? '/'} ${totalPages}`;
    }
  }

  return {
    appearance,
    layout,
    components: {
      root: 'div',
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
    pageCount,
  };
};
