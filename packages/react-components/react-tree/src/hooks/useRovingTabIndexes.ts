import { useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';
import { HTMLElementFilter, useHTMLElementWalkerRef } from './useHTMLElementWalker';

/**
 * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export function useRovingTabIndex(filter?: HTMLElementFilter) {
  const currentElementRef = React.useRef<HTMLElement>();
  const [walkerRef, rootRef] = useHTMLElementWalkerRef(filter);

  const rootRefCallback = (element?: HTMLElement) => {
    if (!element) {
      return;
    }
    reset();
  };

  function reset() {
    if (!walkerRef.current) {
      return;
    }
    const walker = walkerRef.current;
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
  }
  function rove(nextElement: HTMLElement) {
    if (!currentElementRef.current) {
      return;
    }
    currentElementRef.current.tabIndex = -1;
    nextElement.tabIndex = 0;
    nextElement.focus();
    currentElementRef.current = nextElement;
  }

  return [
    {
      rove,
      reset,
    },
    useMergedRefs(rootRef, rootRefCallback) as React.Ref<HTMLElement>,
  ] as const;
}
