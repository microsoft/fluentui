import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { TreeNavigationData_unstable } from '../Tree';
import { nextTypeAheadElement } from '../utils/nextTypeAheadElement';
import { treeDataTypes } from '../utils/tokens';
import { useRovingTabIndex } from './useRovingTabIndexes';
import { HTMLElementWalker } from '../utils/createHTMLElementWalker';
import { TreeItemValue } from '../TreeItem';
import { dataTreeItemValueAttrName } from '../utils/getTreeItemValueFromElement';
import * as React from 'react';
import { useHTMLElementWalkerRef } from './useHTMLElementWalkerRef';

export function useFlatTreeNavigation() {
  'use no memo';

  const { walkerRef, rootRef: walkerRootRef } = useHTMLElementWalkerRef();
  const { rove, initialize: initializeRovingTabIndex } = useRovingTabIndex();

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
  return { navigate, rootRef: useMergedRefs<HTMLDivElement>(walkerRootRef, rootRefCallback) } as const;
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
