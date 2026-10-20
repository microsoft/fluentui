'use client';

import * as React from 'react';
import { isHTMLElement, useEventCallback, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import type { RefAttributes } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterState } from './TeachingPopoverCarouselFooter.types';

const getParent = (element: HTMLElement): HTMLElement | null => {
  if (element.parentElement) {
    return element.parentElement;
  }
  const root = element.getRootNode();
  const ShadowRootConstructor = element.ownerDocument.defaultView?.ShadowRoot;
  return ShadowRootConstructor && root instanceof ShadowRootConstructor && isHTMLElement(root.host) ? root.host : null;
};

const isAvailable = (element: HTMLElement): boolean => {
  const view = element.ownerDocument.defaultView;
  if (!element.isConnected || !view || element.matches(':disabled')) {
    return false;
  }
  const visibility = view.getComputedStyle(element).visibility;
  if (visibility === 'hidden' || visibility === 'collapse') {
    return false;
  }
  for (let current: HTMLElement | null = element; current; current = getParent(current)) {
    const style = view.getComputedStyle(current);
    if (
      current.matches('[hidden], [inert], [aria-disabled="true"]') ||
      style.display === 'none' ||
      style.getPropertyValue('content-visibility') === 'hidden'
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

export const useTeachingPopoverCarouselFooterFocus = (
  state: TeachingPopoverCarouselFooterState,
): TeachingPopoverCarouselFooterState => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const previousRef = React.useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const nextRef = React.useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const ownsFocus = React.useRef(false);
  const wasUnavailable = React.useRef(false);
  const pending = React.useRef(false);
  const previousSlotProps:
    | (NonNullable<typeof state.previous> & RefAttributes<HTMLButtonElement & HTMLAnchorElement>)
    | undefined = state.previous;
  const nextSlotProps: typeof state.next & RefAttributes<HTMLButtonElement & HTMLAnchorElement> = state.next;
  const { altText, onFocus, onBlur } = state.previous ?? {};

  const reconcileFocus = useEventCallback(() => {
    const previous = previousRef.current;
    if (!rootRef.current?.isConnected || !previous || altText !== null || previousSlotProps?.navType !== 'prev') {
      pending.current = false;
      wasUnavailable.current = false;
      return;
    }

    const active = getActiveElement(previous);
    const unavailable = !previous.hasChildNodes() && !isAvailable(previous);
    if (unavailable && !wasUnavailable.current && ownsFocus.current) {
      pending.current = true;
    }
    if (!unavailable) {
      pending.current = false;
      if (wasUnavailable.current && active !== previous) {
        ownsFocus.current = false;
      }
    }
    wasUnavailable.current = unavailable;

    if (active && active !== previous && active !== previous.ownerDocument.body) {
      ownsFocus.current = false;
      pending.current = false;
    }
    if (!pending.current) {
      return;
    }
    const next = nextRef.current;
    if (nextSlotProps.navType === 'next' && next && isAvailable(next) && next.tabIndex >= 0) {
      next.focus();
      if (getActiveElement(next) === next) {
        pending.current = false;
        ownsFocus.current = false;
      }
    }
  });

  const registerNext = React.useCallback(
    (element: (HTMLButtonElement & HTMLAnchorElement) | null) => {
      nextRef.current = element;
      // Ref callbacks can detach and reattach during a commit. Recheck after all
      // slots have attached rather than consuming a handoff between siblings.
      if (element) {
        element.ownerDocument.defaultView?.queueMicrotask(reconcileFocus);
      }
    },
    [reconcileFocus],
  );
  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      ownsFocus.current = true;
      onFocus?.(event);
    },
    [onFocus],
  );
  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      // Hiding can blur to the body; an explicit blur while available cancels.
      if (
        (event.relatedTarget && event.relatedTarget !== event.currentTarget.ownerDocument.body) ||
        isAvailable(event.currentTarget)
      ) {
        ownsFocus.current = false;
        pending.current = false;
      }
      onBlur?.(event);
    },
    [onBlur],
  );
  const previousMergedRef = useMergedRefs(previousSlotProps?.ref, previousRef);
  const nextMergedRef = useMergedRefs(nextSlotProps.ref, registerNext);
  const rootMergedRef = useMergedRefs(state.root.ref, rootRef);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const view = root?.ownerDocument.defaultView;
    if (!root || !view || altText !== null) {
      return;
    }
    const preserveOutsideFocus = () => {
      const previous = previousRef.current;
      const active = previous && getActiveElement(previous);
      if (active && active !== previous && active !== root.ownerDocument.body) {
        ownsFocus.current = false;
        pending.current = false;
      }
    };
    const observer = new view.MutationObserver(reconcileFocus);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden', 'inert', 'disabled', 'aria-disabled', 'style', 'class'],
    });
    root.ownerDocument.addEventListener('focusin', preserveOutsideFocus, true);
    reconcileFocus();
    return () => {
      observer.disconnect();
      root.ownerDocument.removeEventListener('focusin', preserveOutsideFocus, true);
    };
  });

  const previousSlot = previousSlotProps
    ? { ...previousSlotProps, ref: previousMergedRef, onFocus: handleFocus, onBlur: handleBlur }
    : undefined;
  const nextSlot = { ...nextSlotProps, ref: nextMergedRef };
  return {
    ...state,
    root: { ...state.root, ref: rootMergedRef },
    previous: previousSlot,
    next: nextSlot,
  };
};
