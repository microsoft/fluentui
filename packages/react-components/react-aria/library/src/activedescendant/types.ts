import * as React from 'react';

export interface ActiveDescendantImperativeRef {
  first: (options?: IteratorOptions) => string | undefined;
  last: (options?: IteratorOptions) => string | undefined;
  next: (options?: IteratorOptions) => string | undefined;
  prev: (options?: IteratorOptions) => string | undefined;
  find: (predicate: (id: string) => boolean, options?: IteratorOptions & FindOptions) => string | undefined;
  blur: () => void;
  active: () => string | undefined;
  focus: (id: string) => void;
  /**
   * @deprecated This function is not used internally anymore and will be removed in the future
   */
  focusLastActive: () => void;
  /**
   * Scrolls the active option into view, if it still exists
   */
  scrollActiveIntoView: () => void;
  hideAttributes: () => void;
  showAttributes: () => void;
  hideFocusVisibleAttributes: () => void;
  showFocusVisibleAttributes: () => void;
}

export interface ActiveDescendantOptions {
  /**
   * @param el - HTML element to test
   * @returns whether the element can be an active descendant
   */
  matchOption: (el: HTMLElement) => boolean;
  /**
   * Forward imperative refs when exposing functionality from a React component
   */
  imperativeRef?: React.RefObject<ActiveDescendantImperativeRef>;
}

export interface FindOptions {
  /**
   * Starts the search from a specific id
   */
  startFrom?: string;
}

export interface UseActiveDescendantReturn<
  TActiveParentElement extends HTMLElement = HTMLElement,
  TListboxElement extends HTMLElement = HTMLElement,
> {
  /**
   * Attach this to the element that contains all active descendants
   */
  listboxRef: React.Ref<TListboxElement>;
  /**
   * Attach this to the element that has an active descendant
   */
  activeParentRef: React.Ref<TActiveParentElement>;
  /**
   * Imperative functions to manage active descendants within the listboxRef
   */
  controller: ActiveDescendantImperativeRef;
}

export interface IteratorOptions {
  /**
   * When passive, the active descendant is changed
   * @default false
   */
  passive?: boolean;
}
