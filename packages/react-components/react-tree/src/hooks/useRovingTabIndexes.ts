import * as React from 'react';
import { HTMLElementWalker } from '../utils/createHTMLElementWalker';
import { useListenFocusedElement } from '@fluentui/react-tabster';
import { elementContains } from '@fluentui/react-utilities';

/**
 * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export function useRovingTabIndex() {
  const currentElementRef = React.useRef<HTMLElement>();
  const walkerRef = React.useRef<HTMLElementWalker | null>(null);
  useListenFocusedElement(element => {
    if (
      walkerRef.current &&
      element &&
      elementContains(walkerRef.current.root, element) &&
      element.getAttribute('role') === 'treeitem'
    ) {
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
  const rove = React.useCallback((nextElement: HTMLElement) => {
    if (!currentElementRef.current) {
      return;
    }
    currentElementRef.current.tabIndex = -1;
    nextElement.tabIndex = 0;
    nextElement.focus();
    currentElementRef.current = nextElement;
  }, []);

  return {
    rove,
    initialize,
  };
}
