'use client';

import * as React from 'react';
import { useTeachingPopoverCarouselFooterButtonBase_unstable } from '@fluentui/react-teaching-popover';
import { getParent, isHTMLElement, useMergedRefs } from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { TeachingPopoverCarouselFooterContext } from '../TeachingPopoverCarouselFooter/TeachingPopoverCarouselFooterContext';
import type {
  TeachingPopoverCarouselFooterButtonProps,
  TeachingPopoverCarouselFooterButtonState,
} from './TeachingPopoverCarouselFooterButton.types';

function isFocusable(element: HTMLElement): boolean {
  const win = element.ownerDocument.defaultView;
  if (!element.isConnected || !win || element.matches(':disabled') || !element.matches('button, a[href], [tabindex]')) {
    return false;
  }

  const { visibility } = win.getComputedStyle(element);
  if (visibility === 'hidden' || visibility === 'collapse') {
    return false;
  }

  for (
    let ancestor: Node | null = element;
    isHTMLElement(ancestor);
    ancestor = ancestor.assignedSlot ?? getParent(ancestor, { skipVirtual: true })
  ) {
    if (
      ancestor.hidden ||
      ancestor.hasAttribute('inert') ||
      ancestor.getAttribute('aria-hidden')?.toLowerCase() === 'true' ||
      win.getComputedStyle(ancestor).display === 'none'
    ) {
      return false;
    }
  }
  return true;
}

function getActiveElement(root: HTMLElement, targetDocument: Document | undefined): Element | null | undefined {
  const scopes: ShadowRoot[] = [];
  let scope = root.getRootNode() as Document | ShadowRoot;
  while ('host' in scope) {
    scopes.push(scope);
    scope = scope.host.getRootNode() as Document | ShadowRoot;
  }

  let active = targetDocument?.activeElement;
  while (active) {
    // The root's own ancestry also gives access to closed shadow roots.
    const shadow = active.shadowRoot ?? scopes.find(candidate => candidate.host === active);
    if (!shadow?.activeElement) {
      break;
    }
    active = shadow.activeElement;
  }
  return active;
}

export const useTeachingPopoverCarouselFooterButton = (
  props: TeachingPopoverCarouselFooterButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselFooterButtonState => {
  const state = useTeachingPopoverCarouselFooterButtonBase_unstable(props, ref);
  const rootRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const focusedRef = React.useRef(false);
  const buttons = React.useContext(TeachingPopoverCarouselFooterContext);
  const { targetDocument } = useFluent_unstable();

  const register = React.useCallback(
    (element: HTMLButtonElement | HTMLAnchorElement | null) => {
      buttons?.register(props.navType, element);
    },
    [buttons, props.navType],
  );

  const callerRef: React.Ref<HTMLButtonElement | HTMLAnchorElement> | undefined = state.root.ref;
  const lifecycleRef = React.useMemo(() => {
    if (typeof callerRef !== 'function') {
      return callerRef;
    }
    let cleanup: void | (() => void);
    // The merged ref uses null detachment, including on React versions before ref cleanup support.
    return (element: HTMLButtonElement | HTMLAnchorElement | null): void => {
      if (element === null && typeof cleanup === 'function') {
        const detach = cleanup;
        cleanup = undefined;
        detach();
      } else {
        cleanup = callerRef(element);
      }
    };
  }, [callerRef]);
  const mergedRef = useMergedRefs(rootRef, lifecycleRef, register);
  const { onFocus: callerOnFocus, onBlur: callerOnBlur } = state.root;
  const onFocus = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      focusedRef.current = true;
      callerOnFocus?.(event);
    },
    [callerOnFocus],
  );
  const onBlur = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      // Hiding can blur the button before the effect recovers focus.
      if (rootRef.current && isFocusable(rootRef.current)) {
        focusedRef.current = false;
      }
      callerOnBlur?.(event);
    },
    [callerOnBlur],
  );

  // Passive effects run after sibling refs have reattached for this commit.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const active = getActiveElement(root, targetDocument);
    const ownedFocus = focusedRef.current;
    focusedRef.current = active === root;
    if (ownedFocus && !isFocusable(root) && (active === root || active === null || active === targetDocument?.body)) {
      focusedRef.current = false;
      const destination = buttons?.getButton(props.navType === 'prev' ? 'next' : 'prev');
      if (destination && isFocusable(destination)) {
        destination.focus();
      }
    }
  });

  return {
    ...state,
    root: {
      ...state.root,
      ref: mergedRef,
      onFocus,
      onBlur,
    },
  };
};
