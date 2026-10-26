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

function* getElements(root: HTMLElement): Generator<HTMLElement> {
  yield root;
  let children: HTMLCollection | Element[] = root.shadowRoot?.children ?? root.children;
  if (isHTMLElement(root, { constructorName: 'HTMLSlotElement' })) {
    const assigned = root.assignedElements({ flatten: true });
    if (assigned.length) {
      children = assigned;
    }
  }
  for (const child of Array.from(children)) {
    if (isHTMLElement(child)) {
      yield* getElements(child);
    }
  }
}

const isTabStop = (element: HTMLElement): boolean =>
  element.tabIndex >= 0 ||
  (!element.hasAttribute('tabindex') &&
    ((element.isContentEditable && !element.parentElement?.isContentEditable) ||
      element.matches('audio[controls], video[controls]')));

const focusCard = (card: HTMLElement): boolean => {
  const view = card.ownerDocument.defaultView;
  if (!view) {
    return false;
  }
  if (card.hasAttribute('tabindex')) {
    return focusElement(card);
  }
  card.setAttribute('tabindex', '-1');
  let adopted = false;
  const hasAuthorWrite = (records: MutationRecord[]) =>
    records.some(record => record.target === card && record.attributeName === 'tabindex');
  const cleanup = () => {
    adopted ||= hasAuthorWrite(observer.takeRecords());
    observer.disconnect();
    card.removeEventListener('blur', cleanup);
    if (!adopted && card.getAttribute('tabindex') === '-1') {
      card.removeAttribute('tabindex');
    }
  };
  const observer = new view.MutationObserver(records => {
    adopted ||= hasAuthorWrite(records);
    if (adopted || !card.isConnected) {
      cleanup();
    }
  });
  // Observe after our write so even an identical consumer write takes ownership.
  observer.observe(card, { attributes: true, attributeFilter: ['tabindex'] });
  observer.observe(card.ownerDocument, { childList: true, subtree: true });
  observer.observe(card.getRootNode(), { childList: true, subtree: true });
  card.addEventListener('blur', cleanup);
  const focused = focusElement(card);
  if (!focused) {
    cleanup();
  }
  return focused;
};

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
    for (const control of getElements(card)) {
      if (control === card || !isTabStop(control) || !isAvailable(control)) {
        continue;
      }
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
    if (focusCard(card)) {
      cancelOwnership();
    }
  });

  const observeAvailability = useEventCallback(() => {
    const currentSubscription = subscription.current;
    if (!currentSubscription) {
      return;
    }
    const { root, observer } = currentSubscription;
    observer.disconnect();
    const observeTree = (element: HTMLElement) => {
      observer.observe(element, { childList: true, subtree: true, attributes: true });
      for (const descendant of getElements(element)) {
        if (descendant.shadowRoot) {
          observer.observe(descendant.shadowRoot, { childList: true, subtree: true, attributes: true });
        }
      }
    };
    observeTree(root);
    const ancestors = new Set<HTMLElement>();
    if (carouselRoot) {
      observeTree(carouselRoot);
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
    (
      event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>,
      handler?: React.FocusEventHandler<HTMLButtonElement & HTMLAnchorElement>,
    ) => {
      focusOwner.current = event.currentTarget;
      focusValue.current = carousel?.value;
      handler?.(event);
    },
    [carousel?.value],
  );
  const handleBlur = React.useCallback(
    (
      event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>,
      handler?: React.FocusEventHandler<HTMLButtonElement & HTMLAnchorElement>,
    ) => {
      // Hiding can blur to the body; an explicit blur while available cancels.
      if (
        (event.relatedTarget && event.relatedTarget !== event.currentTarget.ownerDocument.body) ||
        isAvailable(event.currentTarget)
      ) {
        cancelOwnership();
      }
      handler?.(event);
    },
    [cancelOwnership],
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
    ? {
        ...previousSlotProps,
        ref: previousMergedRef,
        onFocus: (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => handleFocus(event, onFocus),
        onBlur: (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => handleBlur(event, onBlur),
      }
    : undefined;
  const nextSlot = {
    ...nextSlotProps,
    ref: nextMergedRef,
    onFocus: (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => handleFocus(event, onNextFocus),
    onBlur: (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => handleBlur(event, onNextBlur),
  };
  return {
    ...state,
    root: { ...state.root, ref: rootMergedRef },
    previous: previousSlot,
    next: nextSlot,
  };
};
