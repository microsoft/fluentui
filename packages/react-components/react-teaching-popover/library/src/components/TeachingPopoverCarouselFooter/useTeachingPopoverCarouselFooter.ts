'use client';

import { getIntrinsicElementProps, slot, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';

import type {
  TeachingPopoverCarouselFooterProps,
  TeachingPopoverCarouselFooterState,
  TeachingPopoverCarouselFooterBaseProps,
  TeachingPopoverCarouselFooterBaseState,
} from './TeachingPopoverCarouselFooter.types';
import { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';
import { useCarouselContext_unstable } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import { useCarouselValues_unstable } from '../TeachingPopoverCarousel/Carousel/useCarouselValues';

/**
 * Builds footer slots and coordinates focus within this footer's navigation pair.
 * Previous is optional; text and presentation defaults are supplied by the styled hook.
 * The caller supplies its button component to keep headless consumers free of styles.
 */
export const useTeachingPopoverCarouselFooterBase_unstable = (
  props: TeachingPopoverCarouselFooterBaseProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselFooterBaseState => {
  const { footerButton, ...rest } = props;
  const previous = slot.optional(props.previous, {
    defaultProps: { navType: 'prev' },
    elementType: footerButton,
  });
  const next = slot.always(props.next, {
    defaultProps: { navType: 'next' },
    elementType: footerButton,
  });
  const previousRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const nextRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const focusedButton = React.useRef<EventTarget | null>(null);
  const previousMergedRef = useMergedRefs(previousRef, previous?.ref);
  next.ref = useMergedRefs(nextRef, next.ref);
  if (previous) {
    previous.ref = previousMergedRef;
  }

  const { targetDocument } = useFluent_unstable();
  const value = useCarouselContext_unstable(context => context.value);
  const values = useCarouselValues_unstable(snapshot => snapshot);
  const index = value === null ? -1 : values.indexOf(value);
  for (const button of [previous, next]) {
    if (button) {
      const boundary = index >= 0 && index === (button.navType === 'prev' ? 0 : values.length - 1);
      button.hidden = button.hidden || (boundary && (button.altText === null || button.altText === undefined));
    }
  }

  useIsomorphicLayoutEffect(() => {
    const focused = focusedButton.current;
    const active = targetDocument?.activeElement;
    if (!focused || (active !== focused && active !== targetDocument?.body)) {
      return;
    }
    if (previous?.hidden && focused === previousRef.current) {
      nextRef.current?.focus();
    } else if (next.hidden && focused === nextRef.current) {
      previousRef.current?.focus();
    }
  }, [previous?.hidden, next.hidden, targetDocument]);

  const root = slot.always(getIntrinsicElementProps('div', { ref, ...rest }), { elementType: 'div' });
  root.onFocusCapture = event => {
    focusedButton.current = event.target;
    props.onFocusCapture?.(event);
  };
  root.onBlurCapture = event => {
    focusedButton.current = null;
    props.onBlurCapture?.(event);
  };

  return {
    components: {
      root: 'div',
      next: footerButton,
      previous: footerButton,
    },
    root,
    previous,
    next,
  };
};

export const useTeachingPopoverCarouselFooter_unstable = (
  props: TeachingPopoverCarouselFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselFooterState => {
  const { layout = 'centered', initialStepText, finalStepText } = props;

  const previous = slot.optional(props.previous, {
    defaultProps: {
      navType: 'prev',
      altText: initialStepText,
    },
    renderByDefault: true,
    elementType: TeachingPopoverCarouselFooterButton,
  });

  const next = slot.always(props.next, {
    defaultProps: {
      navType: 'next',
      altText: finalStepText,
    },
    elementType: TeachingPopoverCarouselFooterButton,
  });

  return {
    ...useTeachingPopoverCarouselFooterBase_unstable(
      { ...props, previous: previous ?? null, next, footerButton: TeachingPopoverCarouselFooterButton },
      ref,
    ),
    layout,
  };
};
