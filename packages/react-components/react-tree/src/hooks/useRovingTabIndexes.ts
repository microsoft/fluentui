import * as React from 'react';
import { HTMLElementWalker } from '../utils/createHTMLElementWalker';
import { useFocusedElementChange } from '@fluentui/react-tabster';
import { elementContains } from '@fluentui/react-utilities';

/**
 * @internal
 * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export function useRovingTabIndex() {
  const currentElementRef = React.useRef<HTMLElement | null>(null);
  const walkerRef = React.useRef<HTMLElementWalker | null>(null);

  React.useEffect(() => {
    if (currentElementRef.current === null && walkerRef.current) {
      initialize(walkerRef.current);
    }
  });

  useFocusedElementChange(element => {
    if (
      element?.getAttribute('role') === 'treeitem' &&
      walkerRef.current &&
      elementContains(walkerRef.current.root, element)
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
  const rove = React.useCallback((nextElement: HTMLElement, focusOptions?: FocusOptions) => {
    if (!currentElementRef.current) {
      return;
    }
    currentElementRef.current.tabIndex = -1;
    nextElement.tabIndex = 0;
    nextElement.focus(focusOptions);
    currentElementRef.current = nextElement;
  }, []);

  return {
    rove,
    initialize,
  };
}
