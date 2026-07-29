'use client';

import { fuiSelector, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { TreeNavigationData_unstable } from '../Tree';
import { nextTypeAheadElement } from '../utils/nextTypeAheadElement';
import { treeDataTypes } from '../utils/tokens';
import { useRovingTabIndex } from './useRovingTabIndexes';
import type { HTMLElementWalker } from '../utils/createHTMLElementWalker';
import type { TreeItemValue } from '../TreeItem';
import { dataTreeItemValueAttrName } from '../utils/getTreeItemValueFromElement';
import * as React from 'react';
import { useHTMLElementWalkerRef } from './useHTMLElementWalkerRef';
import type { TreeNavigationMode } from '../components/Tree/Tree.types';
import { useFocusFinders } from '@fluentui/react-tabster';
import { treeItemLayoutClassNames } from '../TreeItemLayout';
import treeItemLayoutStyles from '../components/TreeItemLayout/TreeItemLayout.module.css';

export function useFlatTreeNavigation(navigationMode: TreeNavigationMode = 'tree'): {
  navigate: (data: TreeNavigationData_unstable) => void;
  rootRef: React.RefCallback<HTMLElement>;
  forceUpdateRovingTabIndex: () => void;
} {
  'use no memo'; // justified: compiler would optimize useFlatTreeNavigation — manual opt-out to preserve runtime behavior

  const { walkerRef, rootRef: walkerRootRef } = useHTMLElementWalkerRef();
  const { rove, forceUpdate: forceUpdateRovingTabIndex, initialize: initializeRovingTabIndex } = useRovingTabIndex();
  const { findFirstFocusable } = useFocusFinders();

  const rootRefCallback: React.RefCallback<HTMLElement> = React.useCallback(
    root => {
      if (walkerRef.current && root) {
        initializeRovingTabIndex(walkerRef.current);
      }
    },
    [initializeRovingTabIndex, walkerRef],
  );

  function getNextElement(data: TreeNavigationData_unstable) {
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
        const nextElement = parentElement(data.parentValue, walkerRef.current);
        if (!nextElement && process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.warn(
            /* #__DE-INDENT__ */ `
            @fluentui/react-tree [useFlatTreeNavigation]:
            \'ArrowLeft\' navigation was not possible.
            No parent element found for the current element:
          `,
            data.target,
          );
        }
        return nextElement;
      }
      case treeDataTypes.ArrowRight: {
        if (navigationMode === 'treegrid') {
          const actions = queryActions(data.target);
          if (actions) {
            findFirstFocusable(actions)?.focus();
          }
          return null;
        }
        walkerRef.current.currentElement = data.target;
        const nextElement = firstChild(data.target, walkerRef.current);
        if (!nextElement && process.env.NODE_ENV !== 'production') {
          const ariaLevel = Number(data.target.getAttribute('aria-level'));
          // eslint-disable-next-line no-console
          console.warn(
            /* #__DE-INDENT__ */ `
            @fluentui/react-tree [useFlatTreeNavigation]:
            \'ArrowRight\' navigation was not possible.
            No element with "aria-posinset=1" and "aria-level=${ariaLevel + 1}"
            was found after the current element!
          `,
            data.target,
          );
        }
        return nextElement;
      }
      case treeDataTypes.End:
        walkerRef.current.currentElement = walkerRef.current.root;
        return walkerRef.current.lastChild();
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
  }
  const navigate = useEventCallback((data: TreeNavigationData_unstable) => {
    const nextElement = getNextElement(data);
    if (nextElement) {
      rove(nextElement);
    }
  });
  return {
    navigate,
    rootRef: useMergedRefs<HTMLElement>(walkerRootRef, rootRefCallback),
    forceUpdateRovingTabIndex,
  } as const;
}

function firstChild(target: HTMLElement, treeWalker: HTMLElementWalker): HTMLElement | null {
  const nextElement = treeWalker.nextElement();
  if (!nextElement) {
    return null;
  }
  const nextElementAriaPosInSet = nextElement.getAttribute('aria-posinset');
  const nextElementAriaLevel = nextElement.getAttribute('aria-level');
  const targetAriaLevel = target.getAttribute('aria-level');
  if (nextElementAriaPosInSet === '1' && Number(nextElementAriaLevel) === Number(targetAriaLevel) + 1) {
    return nextElement;
  }
  return null;
}

function parentElement(parentValue: TreeItemValue | undefined, treeWalker: HTMLElementWalker) {
  if (parentValue === undefined) {
    return null;
  }
  return treeWalker.root.querySelector<HTMLElement>(`[${dataTreeItemValueAttrName}="${parentValue}"]`);
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
