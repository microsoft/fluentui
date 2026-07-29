'use client';

import type { TreeNavigationData_unstable, TreeNavigationMode } from '../components/Tree/Tree.types';
import { nextTypeAheadElement } from '../utils/nextTypeAheadElement';
import { treeDataTypes } from '../utils/tokens';
import { useRovingTabIndex } from './useRovingTabIndexes';
import type { HTMLElementWalker } from '../utils/createHTMLElementWalker';
import * as React from 'react';
import { useHTMLElementWalkerRef } from './useHTMLElementWalkerRef';
import { fuiSelector, useMergedRefs } from '@fluentui/react-utilities';
import { treeItemLayoutClassNames } from '../TreeItemLayout';
import treeItemLayoutStyles from '../components/TreeItemLayout/TreeItemLayout.module.css';
import { useFocusFinders } from '@fluentui/react-tabster';

/***
 * Hook used to manage navigation in the tree.
 *
 * @param navigationMode - the navigation mode of the tree, 'tree' (default) or 'treegrid'
 */
export function useTreeNavigation(navigationMode: TreeNavigationMode = 'tree'): {
  navigate: (data: TreeNavigationData_unstable, focusOptions?: FocusOptions) => HTMLElement | null;
  treeRef: React.RefCallback<HTMLElement>;
  forceUpdateRovingTabIndex: () => void;
} {
  'use no memo'; // justified: compiler would optimize useTreeNavigation — manual opt-out to preserve runtime behavior

  const { rove, initialize: initializeRovingTabIndex, forceUpdate: forceUpdateRovingTabIndex } = useRovingTabIndex();
  const { findFirstFocusable } = useFocusFinders();
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
        const actions = queryActions(data.target);
        if (navigationMode === 'treegrid' && actions?.contains(data.target.ownerDocument.activeElement)) {
          return data.target;
        }
        walkerRef.current.currentElement = data.target;
        return walkerRef.current.parentElement();
      }
      case treeDataTypes.ArrowRight:
        if (navigationMode === 'treegrid') {
          const actions = queryActions(data.target);
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

/**
 * Finds the TreeItemLayout `actions` element belonging to `target` (a TreeItem root).
 *
 * DECISIONS.md D16 split what used to be one BEM-static selector into its two halves:
 *
 * - the layout ROOT keeps a public handle — its named-group marker, which is what
 *   `treeItemLayoutClassNames.root` now resolves to. `fuiSelector()` escapes the `/`, which
 *   is legal in a class TOKEN but terminates the name in SELECTOR position (D16.5).
 * - the `actions` SUB-SLOT has no public handle any more: D16.1 removed
 *   `fui-TreeItemLayout__actions` and D16.5 deleted the per-slot key with it. This hook ships
 *   in the same package as the module that styles that slot, so it reads the hashed class
 *   straight from the class map — a PRIVATE coupling, which is what D16.3 prescribes whenever
 *   the owning package can reach the slot itself, instead of renaming a public one.
 *
 * The `:scope >` combinator is why D15.1 / D16.2 forbid the marker at `classList[0]`: jsdom
 * polyfills `:scope` through nwsapi, which anchors on `escape(element.classList[0])`.
 */
const queryActions = (target: HTMLElement) =>
  target.querySelector<HTMLElement>(
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained identity constant (D16.5)
    `:scope > ${fuiSelector(treeItemLayoutClassNames.root)} > .${treeItemLayoutStyles.actions}`,
  );
