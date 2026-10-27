'use client';

import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import type { TreeNavigationData_unstable, TreeNavigationMode } from '../components/Tree/Tree.types';
import { nextTypeAheadElement } from '../utils/nextTypeAheadElement';
import { treeDataTypes } from '../utils/tokens';
import type { HTMLElementWalker } from '../utils/createHTMLElementWalker';
import { useHTMLElementWalkerRef } from './useHTMLElementWalkerRef';
import { useRovingTabIndexBase } from './useRovingTabIndexBase';
import type { UseFocusedElementChange } from './useRovingTabIndexBase';
import { queryTreeItemActions } from '../utils/queryTreeItemActions';

/**
 * Plain DOM approximation of Tabster's focus finders, used when no focus management runtime is provided.
 */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), details > summary:first-of-type, [tabindex]:not([tabindex="-1"]), [contenteditable]:not([contenteditable="false"])';

/**
 * @internal
 */
export type TreeNavigationOptions = {
  /**
   * Finds the first focusable element within the given container.
   */
  findFirstFocusable: (container: HTMLElement) => HTMLElement | null | undefined;
  /**
   * Subscribes to focused element changes, used to keep the roving tab index in sync with focus.
   */
  useFocusedElementChange: UseFocusedElementChange;
};

/**
 * Plain DOM implementation of `TreeNavigationOptions['findFirstFocusable']`.
 *
 * @internal
 */
export const findFirstFocusableDOM: TreeNavigationOptions['findFirstFocusable'] = container =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).find(isFocusableDOM) ?? null;

function isFocusableDOM(element: HTMLElement): boolean {
  const contentEditable = element.getAttribute('contenteditable')?.toLowerCase();
  const isEditable =
    element.isContentEditable ||
    contentEditable === 'true' ||
    contentEditable === 'plaintext-only' ||
    contentEditable === '';
  if (
    element.matches(':disabled') ||
    (element.hasAttribute('tabindex') && element.tabIndex < 0) ||
    (element.tabIndex < 0 && !isEditable)
  ) {
    return false;
  }

  const getComputedStyle = (target: HTMLElement) => target.ownerDocument.defaultView?.getComputedStyle(target);

  // `visibility` is inherited and can be overridden by a descendant, so only the candidate's own computed value matters
  const visibility = getComputedStyle(element)?.visibility;
  if (visibility === 'hidden' || visibility === 'collapse') {
    return false;
  }

  let current: HTMLElement | null = element;
  while (current) {
    if (
      current.hidden ||
      current.hasAttribute('inert') ||
      current.getAttribute('aria-hidden') === 'true' ||
      getComputedStyle(current)?.display === 'none'
    ) {
      return false;
    }

    current = current.parentElement;
  }

  return true;
}

/***
 * Hook used to manage navigation in the tree, with the focus management provided by the caller.
 *
 * @internal
 * @param navigationMode - the navigation mode of the tree, 'tree' (default) or 'treegrid'
 * @param options - focus management used to find focusable elements and track focus changes
 */
export function useTreeNavigationBase(
  navigationMode: TreeNavigationMode = 'tree',
  { findFirstFocusable, useFocusedElementChange }: TreeNavigationOptions,
): {
  navigate: (data: TreeNavigationData_unstable, focusOptions?: FocusOptions) => HTMLElement | null;
  treeRef: React.RefCallback<HTMLElement>;
  forceUpdateRovingTabIndex: () => void;
} {
  'use no memo'; // justified: compiler would optimize useTreeNavigationBase — manual opt-out to preserve runtime behavior

  const {
    rove,
    initialize: initializeRovingTabIndex,
    forceUpdate: forceUpdateRovingTabIndex,
  } = useRovingTabIndexBase(useFocusedElementChange);
  const { walkerRef, rootRef: walkerRootRef } = useHTMLElementWalkerRef();

  const rootRefCallback: React.RefCallback<HTMLElement> = React.useCallback(
    root => {
      if (root && walkerRef.current) {
        initializeRovingTabIndex(walkerRef.current);
      }
    },
    [walkerRef, initializeRovingTabIndex],
  );

  const getNextElement = (data: TreeNavigationData_unstable) => {
    if (!walkerRef.current) {
      return null;
    }
    switch (data.type) {
      case treeDataTypes.Click:
        return data.target;
      case treeDataTypes.TypeAhead:
        walkerRef.current.currentElement = data.target;
        return nextTypeAheadElement(walkerRef.current, data.event.key);
      case treeDataTypes.ArrowLeft: {
        const actions = queryTreeItemActions(data.target);
        if (navigationMode === 'treegrid' && actions?.contains(data.target.ownerDocument.activeElement)) {
          return data.target;
        }
        walkerRef.current.currentElement = data.target;
        return walkerRef.current.parentElement();
      }
      case treeDataTypes.ArrowRight:
        if (navigationMode === 'treegrid') {
          const actions = queryTreeItemActions(data.target);
          if (actions) {
            findFirstFocusable(actions)?.focus();
          }
          return null;
        }
        walkerRef.current.currentElement = data.target;
        return walkerRef.current.firstChild();
      case treeDataTypes.End:
        walkerRef.current.currentElement = walkerRef.current.root;
        return lastChildRecursive(walkerRef.current);
      case treeDataTypes.Home:
        walkerRef.current.currentElement = walkerRef.current.root;
        return walkerRef.current.firstChild();
      case treeDataTypes.ArrowDown:
        walkerRef.current.currentElement = data.target;
        return walkerRef.current.nextElement();
      case treeDataTypes.ArrowUp:
        walkerRef.current.currentElement = data.target;
        return walkerRef.current.previousElement();
    }
  };
  function navigate(data: TreeNavigationData_unstable, focusOptions?: FocusOptions) {
    const nextElement = getNextElement(data);
    if (nextElement) {
      rove(nextElement, focusOptions);
    }
    return nextElement;
  }
  return {
    navigate,
    treeRef: useMergedRefs(walkerRootRef, rootRefCallback) as React.RefCallback<HTMLElement>,
    forceUpdateRovingTabIndex,
  } as const;
}

function lastChildRecursive(walker: HTMLElementWalker) {
  let lastElement: HTMLElement | null = null;
  let nextElement: HTMLElement | null = null;
  while ((nextElement = walker.lastChild())) {
    lastElement = nextElement;
  }
  return lastElement;
}
