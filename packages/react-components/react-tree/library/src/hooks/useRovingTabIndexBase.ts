'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { isHTMLElement } from '@fluentui/react-utilities';
import type { HTMLElementWalker } from '../utils/createHTMLElementWalker';

/**
 * Subscribes to focused element changes, invoking the callback with the newly focused element.
 *
 * @internal
 */
export type UseFocusedElementChange = (callback: (element: HTMLElement | undefined) => void) => void;

const findTreeItemRoot = (element: HTMLElement) => {
  let parent = element.parentElement;
  while (parent && parent.getAttribute('role') !== 'tree') {
    parent = parent.parentElement;
  }
  return parent;
};

/**
 * Plain DOM implementation of `UseFocusedElementChange`, free of any focus management runtime.
 *
 * @internal
 */
export const useDOMFocusedElementChange: UseFocusedElementChange = callback => {
  const { targetDocument } = useFluent();
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  React.useEffect(() => {
    if (!targetDocument) {
      return;
    }
    const listener = (event: FocusEvent) => {
      callbackRef.current(isHTMLElement(event.target) ? event.target : undefined);
    };
    targetDocument.addEventListener('focusin', listener);
    return () => targetDocument.removeEventListener('focusin', listener);
  }, [targetDocument]);
};

/**
 * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 *
 * The focused element tracking is provided by the caller, so that the roving tab index can be
 * driven either by a focus management runtime or by plain DOM events.
 *
 * @internal
 */
export function useRovingTabIndexBase(useFocusedElementChange: UseFocusedElementChange): {
  rove: (nextElement: HTMLElement, focusOptions?: FocusOptions) => void;
  initialize: (walker: HTMLElementWalker) => void;
  forceUpdate: () => void;
} {
  const currentElementRef = React.useRef<HTMLElement | null>(null);
  const walkerRef = React.useRef<HTMLElementWalker | null>(null);
  const { targetDocument } = useFluent();

  // The callback only runs on focus changes, never during render.
  // eslint-disable-next-line react-hooks/refs
  useFocusedElementChange(element => {
    if (element?.getAttribute('role') === 'treeitem' && walkerRef.current && walkerRef.current.root.contains(element)) {
      const treeitemRoot = findTreeItemRoot(element);
      if (walkerRef.current.root !== treeitemRoot) {
        return;
      }
      rove(element);
    }
  });

  const initialize = React.useCallback((walker: HTMLElementWalker) => {
    walkerRef.current = walker;
    walker.currentElement = walker.root;
    let tabbableChild = walker.firstChild(element =>
      element.tabIndex === 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP,
    );
    walker.currentElement = walker.root;
    tabbableChild ??= walker.firstChild();
    if (!tabbableChild) {
      return;
    }
    tabbableChild.tabIndex = 0;
    currentElementRef.current = tabbableChild;
    let nextElement: HTMLElement | null = null;
    while ((nextElement = walker.nextElement()) && nextElement !== tabbableChild) {
      nextElement.tabIndex = -1;
    }
  }, []);
  const rove = React.useCallback((nextElement: HTMLElement, focusOptions?: FocusOptions) => {
    if (!currentElementRef.current) {
      return;
    }
    currentElementRef.current.tabIndex = -1;
    nextElement.tabIndex = 0;
    nextElement.focus(focusOptions);
    currentElementRef.current = nextElement;
  }, []);

  const forceUpdate = React.useCallback(() => {
    if (
      (currentElementRef.current === null || !targetDocument?.body.contains(currentElementRef.current)) &&
      walkerRef.current
    ) {
      initialize(walkerRef.current);
    }
  }, [targetDocument, initialize]);

  return {
    rove,
    initialize,
    forceUpdate,
  };
}
