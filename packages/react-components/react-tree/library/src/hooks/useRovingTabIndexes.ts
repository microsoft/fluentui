import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { HTMLElementWalker } from '../utils/createHTMLElementWalker';
import { useFocusedElementChange } from '@fluentui/react-tabster';

const findTreeItemRoot = (element: HTMLElement) => {
  let parent = element.parentElement;
  while (parent && parent.getAttribute('role') !== 'tree') {
    parent = parent.parentElement;
  }
  return parent;
};

/**
 * @internal
 * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export function useRovingTabIndex(): {
  rove: (nextElement: HTMLElement, focusOptions?: FocusOptions) => void;
  initialize: (walker: HTMLElementWalker) => void;
  forceUpdate: () => void;
} {
  const currentElementRef = React.useRef<HTMLElement | null>(null);
  const walkerRef = React.useRef<HTMLElementWalker | null>(null);
  const { targetDocument } = useFluent();

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
