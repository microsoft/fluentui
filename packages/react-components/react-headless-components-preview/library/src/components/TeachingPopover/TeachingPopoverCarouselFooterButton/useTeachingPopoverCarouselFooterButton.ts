'use client';

import * as React from 'react';
import { useTeachingPopoverCarouselFooterButtonBase_unstable } from '@fluentui/react-teaching-popover';
import { useEventCallback, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import { TeachingPopoverCarouselFooterContext } from '../TeachingPopoverCarouselFooter/teachingPopoverCarouselFooterContext';
import type {
  TeachingPopoverCarouselFooterButtonProps,
  TeachingPopoverCarouselFooterButtonState,
} from './TeachingPopoverCarouselFooterButton.types';

const isAvailable = (element: HTMLElement): boolean => {
  if (!element.isConnected || element.closest('[hidden], [inert], [aria-disabled="true"], :disabled')) {
    return false;
  }

  const view = element.ownerDocument.defaultView;
  for (let current: HTMLElement | null = element; current; current = current.parentElement) {
    const style = view?.getComputedStyle(current);
    if (
      style?.display === 'none' ||
      style?.visibility === 'hidden' ||
      style?.visibility === 'collapse' ||
      style?.getPropertyValue('content-visibility') === 'hidden'
    ) {
      return false;
    }
  }

  return true;
};

const getActiveElement = (element: HTMLElement): Element | null => {
  const root = element.getRootNode();
  const ShadowRootConstructor = element.ownerDocument.defaultView?.ShadowRoot;
  const active = element.ownerDocument.activeElement;
  return ShadowRootConstructor && root instanceof ShadowRootConstructor
    ? root.activeElement ?? (active === root.host ? null : active)
    : active;
};

export const useTeachingPopoverCarouselFooterButton = (
  props: TeachingPopoverCarouselFooterButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselFooterButtonState => {
  const state = useTeachingPopoverCarouselFooterButtonBase_unstable(props, ref);
  const nextRef = React.useContext(TeachingPopoverCarouselFooterContext);
  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const ownsFocus = React.useRef(false);
  const wasEmpty = React.useRef(state.root.children === null);
  const isEmpty = state.root.children === null;
  const { onFocus, onBlur } = state.root;

  const mergedRef = useMergedRefs(state.root.ref, buttonRef, state.navType === 'next' ? nextRef : undefined);
  const handleFocus = useEventCallback((event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    ownsFocus.current = true;
    onFocus?.(event);
  });
  const handleBlur = useEventCallback((event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    // Hiding during a commit can blur to the body before layout effects run.
    // An explicit blur while the action is still available cancels the handoff.
    if (
      (event.relatedTarget && event.relatedTarget !== event.currentTarget.ownerDocument.body) ||
      isAvailable(event.currentTarget)
    ) {
      ownsFocus.current = false;
    }
    onBlur?.(event);
  });

  useIsomorphicLayoutEffect(() => {
    const becameEmpty = !wasEmpty.current && isEmpty;
    wasEmpty.current = isEmpty;
    const previous = buttonRef.current;
    const next = nextRef?.current;
    if (
      state.navType !== 'prev' ||
      state.altText !== null ||
      !becameEmpty ||
      !ownsFocus.current ||
      !previous ||
      isAvailable(previous)
    ) {
      return;
    }

    ownsFocus.current = false;
    const active = getActiveElement(previous);
    if (active && active !== previous && active !== previous.ownerDocument.body) {
      return;
    }

    if (next && isAvailable(next) && next.tabIndex >= 0) {
      next.focus();
    }
  });

  return {
    ...state,
    root: { ...state.root, ref: mergedRef, onFocus: handleFocus, onBlur: handleBlur },
  };
};
