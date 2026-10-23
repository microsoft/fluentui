'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useFocusFinders } from '@fluentui/react-tabster';
import { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';
import type {
  TeachingPopoverCarouselFooterProps,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';

export const useTeachingPopoverCarouselFooter = (
  props: TeachingPopoverCarouselFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselFooterState => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const previousRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const nextRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const { findAllFocusable } = useFocusFinders();
  const previous = slot.optional(props.previous, {
    defaultProps: { navType: 'prev' },
    renderByDefault: false,
    elementType: TeachingPopoverCarouselFooterButton,
  });
  const next = slot.always(props.next, {
    defaultProps: { navType: 'next' },
    elementType: TeachingPopoverCarouselFooterButton,
  });
  const mergedPreviousRef = useMergedRefs(previousRef, previous?.ref);
  const mergedNextRef = useMergedRefs(nextRef, next.ref);
  if (previous) {
    previous.ref = mergedPreviousRef;
  }
  next.ref = mergedNextRef;

  const focusOnBoundary = useEventCallback((source: HTMLElement) => {
    if (source !== previousRef.current && source !== nextRef.current) {
      return;
    }
    const destination = source === previousRef.current ? nextRef.current : previousRef.current;
    if (destination && findAllFocusable(rootRef.current).includes(destination)) {
      destination.focus();
    }
  });

  return {
    components: {
      root: 'div',
      previous: TeachingPopoverCarouselFooterButton,
      next: TeachingPopoverCarouselFooterButton,
    },
    root: slot.always(getIntrinsicElementProps('div', { ...props, ref: useMergedRefs(rootRef, ref) }), {
      elementType: 'div',
    }),
    previous,
    next,
    focusOnBoundary,
  };
};
