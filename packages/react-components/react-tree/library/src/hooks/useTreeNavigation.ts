import { TreeNavigationData_unstable, TreeNavigationMode } from '../components/Tree/Tree.types';
import { nextTypeAheadElement } from '../utils/nextTypeAheadElement';
import { treeDataTypes } from '../utils/tokens';
import { useRovingTabIndex } from './useRovingTabIndexes';
import { HTMLElementWalker } from '../utils/createHTMLElementWalker';
import * as React from 'react';
import { useHTMLElementWalkerRef } from './useHTMLElementWalkerRef';
import { useMergedRefs } from '@fluentui/react-utilities';
import { treeItemLayoutClassNames } from '../TreeItemLayout';
import { useFocusFinders } from '@fluentui/react-tabster';

/**
 * @internal
 */
export function useTreeNavigation(navigationMode: TreeNavigationMode = 'tree'): {
  navigate: (data: TreeNavigationData_unstable, focusOptions?: FocusOptions) => void;
  treeRef: React.RefCallback<HTMLElement>;
  forceUpdateRovingTabIndex: () => void;
} {
  'use no memo';

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

const queryActions = (target: HTMLElement) =>
  target.querySelector<HTMLElement>(
    `:scope > .${treeItemLayoutClassNames.root} > .${treeItemLayoutClassNames.actions}`,
  );
