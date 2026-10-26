'use client';

import * as React from 'react';
import { isHTMLElement, useEventCallback, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import type { RefAttributes } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterState } from './TeachingPopoverCarouselFooter.types';
import { TeachingPopoverCarouselFocusContext } from '../TeachingPopoverCarousel/teachingPopoverCarouselFocusContext';

const getParent = (element: HTMLElement): HTMLElement | null => {
  if (element.assignedSlot) {
    return element.assignedSlot;
  }
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
      current.matches('[hidden], [inert], [aria-disabled="true"], [aria-hidden="true"]') ||
      style.display === 'none' ||
      (current === element && style.display === 'contents') ||
      (current !== element && style.getPropertyValue('content-visibility') === 'hidden')
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

const focusElement = (element: HTMLElement): boolean => {
  element.focus();
  return getActiveElement(element) === element;
};

function* getCardControls(root: HTMLElement): Generator<HTMLElement> {
  const children = isHTMLElement(root, { constructorName: 'HTMLSlotElement' })
    ? root.assignedElements({ flatten: true })
    : root.shadowRoot?.children ?? root.children;
  for (const child of Array.from(children)) {
    if (!isHTMLElement(child)) {
      continue;
    }
    if (child.tabIndex >= 0 && isAvailable(child)) {
      yield child;
    }
    yield* getCardControls(child);
  }
}

export const useTeachingPopoverCarouselFooterFocus = (
  state: TeachingPopoverCarouselFooterState,
): TeachingPopoverCarouselFooterState => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const previousRef = React.useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const nextRef = React.useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const focusOwner = React.useRef<HTMLElement | null>(null);
  const focusValue = React.useRef<string | null | undefined>(undefined);
  const carousel = React.useContext(TeachingPopoverCarouselFocusContext);
  const carouselRoot = carousel?.root;
  const wasUnavailable = React.useRef(false);
  const pending = React.useRef(false);
  const cardFocusCleanup = React.useRef<(() => void) | undefined>(undefined);
  const subscription = React.useRef<
    | {
        root: HTMLDivElement;
        ownerDocument: Document;
        observer: MutationObserver;
        dispose: () => void;
      }
    | undefined
  >(undefined);
  const previousSlotProps:
    | (NonNullable<typeof state.previous> & RefAttributes<HTMLButtonElement & HTMLAnchorElement>)
    | undefined = state.previous;
  const nextSlotProps: typeof state.next & RefAttributes<HTMLButtonElement & HTMLAnchorElement> = state.next;
  const { onFocus, onBlur } = state.previous ?? {};
  const { onFocus: onNextFocus, onBlur: onNextBlur } = state.next;

  const cancelOwnership = React.useCallback(() => {
    focusOwner.current = null;
    focusValue.current = undefined;
    pending.current = false;
    wasUnavailable.current = false;
  }, []);

  const reconcileFocus = useEventCallback(() => {
    const source = focusOwner.current;
    const previous = source === previousRef.current;
    const sourceProps = previous ? previousSlotProps : nextSlotProps;
    if (
      !rootRef.current?.isConnected ||
      !source ||
      (!previous && source !== nextRef.current) ||
      sourceProps?.navType !== (previous ? 'prev' : 'next')
    ) {
      cancelOwnership();
      return;
    }
    if (!source.ownerDocument.hasFocus()) {
      cancelOwnership();
      return;
    }

    const active = getActiveElement(source);
    if (sourceProps.altText !== null) {
      pending.current = false;
      wasUnavailable.current = false;
      if (active !== source) {
        focusOwner.current = null;
      }
      return;
    }
    const unavailable = !source.hasChildNodes() && !isAvailable(source);
    const accepted = !carousel || (focusValue.current !== undefined && carousel.value !== focusValue.current);
    if (unavailable && accepted) {
      pending.current = true;
    }
    if (!unavailable) {
      pending.current = false;
      if (wasUnavailable.current && active !== source) {
        focusOwner.current = null;
      }
    }
    wasUnavailable.current = unavailable;

    if (active && active !== source && active !== source.ownerDocument.body) {
      focusOwner.current = null;
      pending.current = false;
    }
    if (!pending.current) {
      return;
    }
    const destination = previous ? nextRef.current : previousRef.current;
    const destinationProps = previous ? nextSlotProps : previousSlotProps;
    if (
      destinationProps?.navType === (previous ? 'next' : 'prev') &&
      destination &&
      isAvailable(destination) &&
      destination.tabIndex >= 0 &&
      focusElement(destination)
    ) {
      pending.current = false;
      wasUnavailable.current = false;
      return;
    }
    if (focusOwner.current !== source) {
      return;
    }
    if (!carousel?.root?.isConnected || carousel.value === null || !accepted) {
      return;
    }
    const card = Array.from(
      carousel.root.querySelectorAll<HTMLElement>('[data-carousel-item][data-carousel-active-item="true"]'),
    ).find(candidate => {
      const parentCard = candidate.parentElement?.closest('[data-carousel-item]');
      return (
        candidate.getAttribute('data-carousel-item') === carousel.value &&
        (!parentCard || !carousel.root!.contains(parentCard))
      );
    });
    if (!card) {
      return;
    }
    for (const control of getCardControls(card)) {
      if (focusElement(control)) {
        cancelOwnership();
        return;
      }
      if (focusOwner.current !== source) {
        return;
      }
    }
    if (!isAvailable(card)) {
      return;
    }
    const addedTabIndex = !card.hasAttribute('tabindex');
    if (addedTabIndex) {
      cardFocusCleanup.current?.();
      card.setAttribute('tabindex', '-1');
      const restoreTabIndex = () => {
        card.removeEventListener('blur', restoreTabIndex);
        if (card.getAttribute('tabindex') === '-1') {
          card.removeAttribute('tabindex');
        }
        if (cardFocusCleanup.current === restoreTabIndex) {
          cardFocusCleanup.current = undefined;
        }
      };
      card.addEventListener('blur', restoreTabIndex);
      cardFocusCleanup.current = restoreTabIndex;
    }
    if (focusElement(card)) {
      cancelOwnership();
    } else if (addedTabIndex) {
      cardFocusCleanup.current?.();
    }
  });

  const observeAvailability = useEventCallback(() => {
    const currentSubscription = subscription.current;
    if (!currentSubscription) {
      return;
    }
    const { root, observer } = currentSubscription;
    observer.disconnect();
    observer.observe(root, { childList: true, subtree: true, attributes: true });
    const ancestors = new Set<HTMLElement>();
    if (carouselRoot) {
      observer.observe(carouselRoot, { childList: true, subtree: true, attributes: true });
    }
    for (const element of [root, previousRef.current, nextRef.current, carouselRoot]) {
      for (let current: HTMLElement | null | undefined = element; current; current = getParent(current)) {
        if (current !== root && current !== carouselRoot) {
          ancestors.add(current);
        }
      }
    }
    for (const ancestor of ancestors) {
      observer.observe(ancestor, { attributes: true, childList: true });
    }
  });

  const disposeSubscription = React.useCallback(() => {
    cardFocusCleanup.current?.();
    subscription.current?.dispose();
    subscription.current = undefined;
  }, []);
  const registerRoot = React.useCallback(
    (root: HTMLDivElement | null) => {
      rootRef.current = root;
      // Keep listeners during transient ref detachment so commit-time outside
      // focus is not mistaken for the browser's hidden-control fallback.
      if (!root || (subscription.current?.root === root && subscription.current.ownerDocument === root.ownerDocument)) {
        return;
      }
      if (subscription.current) {
        disposeSubscription();
        const source = [previousRef.current, nextRef.current].find(
          element => element && getActiveElement(element) === element,
        );
        cancelOwnership();
        focusOwner.current = source ?? null;
        focusValue.current = source ? carousel?.value : undefined;
      }
      const ownerDocument = root.ownerDocument;
      const view = ownerDocument.defaultView;
      if (!view) {
        return;
      }
      const preserveOutsideFocus = () => {
        const source = focusOwner.current;
        const active = source && getActiveElement(source);
        if (!source || (active && active !== source && active !== ownerDocument.body)) {
          cancelOwnership();
        }
      };
      const observer = new view.MutationObserver(() => {
        observeAvailability();
        reconcileFocus();
      });
      ownerDocument.addEventListener('focusin', preserveOutsideFocus, true);
      view.addEventListener('blur', cancelOwnership);
      subscription.current = {
        root,
        ownerDocument,
        observer,
        dispose: () => {
          observer.disconnect();
          ownerDocument.removeEventListener('focusin', preserveOutsideFocus, true);
          view.removeEventListener('blur', cancelOwnership);
        },
      };
    },
    [cancelOwnership, disposeSubscription, observeAvailability, reconcileFocus, carousel?.value],
  );

  const registerNext = React.useCallback(
    (element: (HTMLButtonElement & HTMLAnchorElement) | null) => {
      nextRef.current = element;
      // Ref callbacks can detach and reattach during a commit. Recheck after all
      // slots have attached rather than consuming a handoff between siblings.
      if (element) {
        element.ownerDocument.defaultView?.queueMicrotask(() => {
          observeAvailability();
          reconcileFocus();
        });
      }
    },
    [observeAvailability, reconcileFocus],
  );
  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      focusOwner.current = event.currentTarget;
      focusValue.current = carousel?.value;
      onFocus?.(event);
    },
    [onFocus, carousel?.value],
  );
  const handleNextFocus = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      focusOwner.current = event.currentTarget;
      focusValue.current = carousel?.value;
      onNextFocus?.(event);
    },
    [onNextFocus, carousel?.value],
  );
  const handleNextBlur = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      if (
        (event.relatedTarget && event.relatedTarget !== event.currentTarget.ownerDocument.body) ||
        isAvailable(event.currentTarget)
      ) {
        cancelOwnership();
      }
      onNextBlur?.(event);
    },
    [cancelOwnership, onNextBlur],
  );
  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      // Hiding can blur to the body; an explicit blur while available cancels.
      if (
        (event.relatedTarget && event.relatedTarget !== event.currentTarget.ownerDocument.body) ||
        isAvailable(event.currentTarget)
      ) {
        focusOwner.current = null;
        pending.current = false;
      }
      onBlur?.(event);
    },
    [onBlur],
  );
  const previousMergedRef = useMergedRefs(previousSlotProps?.ref, previousRef);
  const nextMergedRef = useMergedRefs(nextSlotProps.ref, registerNext);
  const rootMergedRef = useMergedRefs(state.root.ref, registerRoot);

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) {
      disposeSubscription();
      cancelOwnership();
      return;
    }
    registerRoot(rootRef.current);
    observeAvailability();
    reconcileFocus();
  });
  useIsomorphicLayoutEffect(() => disposeSubscription, [disposeSubscription]);

  const previousSlot = previousSlotProps
    ? { ...previousSlotProps, ref: previousMergedRef, onFocus: handleFocus, onBlur: handleBlur }
    : undefined;
  const nextSlot = { ...nextSlotProps, ref: nextMergedRef, onFocus: handleNextFocus, onBlur: handleNextBlur };
  return {
    ...state,
    root: { ...state.root, ref: rootMergedRef },
    previous: previousSlot,
    next: nextSlot,
  };
};
